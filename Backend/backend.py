from email.policy import HTTP
import uuid
import requests
from fastapi import FastAPI, APIRouter, File, HTTPException, Depends, UploadFile, Body
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os
from supabase import ClientOptions, create_client, Client
from dotenv import load_dotenv
import logging
import Stats.stats as stats
import Backend.auth as auth
import Models.cnn_backend as cnn

# load the environment variables from .env into url and sb_key
load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

# whenever accessed, looks for a bearer token (a token holding user token needed for auth checking)
security = HTTPBearer()

# logger for logging errors
logger = logging.getLogger(__name__)

# create the supabase client (connect to the database)
supabase: Client = create_client(sb_url, sb_key, options=ClientOptions(auto_refresh_token=False, persist_session=False))

# create the router to be accessed by app.py
router = APIRouter()

# get the name of the bird and lng/lat from frontend
# frontent gets:
    # bird_name from AI model and store it in variable to send here
    # lat and lng from API and stores to send her
class Location(BaseModel):
    lat: float
    lng: float

# a decorator; the endpoint the front end will call and the function IMMEDIATELY after will be run

# get the user's points to display
@router.get("/get_points")
def get_points(current_user=Depends(auth.get_current_user), 
               credentials: HTTPAuthorizationCredentials = Depends(security)): 
    try:
        user_id = current_user.id

        # authorize the user; different from get_current_user auth because you are going into the actual database rather than JWT (2 different systems)
        supabase.postgrest.auth(credentials.credentials)

        response = supabase.table("User_Points").select("points").eq("user_id", user_id).execute()
        
        # raise error if user has no points row
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found in User_Points table")
        
        return {
            # return ONLY ONE row in the points column
            "points": response.data[0]["points"] 
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# update the points whenever a picture is taken 
# change this to JUST be a function (to be called by the predict picture model)
def update_points(bird_name, lat, lng, user_id, credentials_token): 
    try:
        # authorize the user to access database
        supabase.postgrest.auth(credentials_token)

        # access database to get current points
        response = supabase.table("User_Points").select("points").eq("user_id", user_id).execute()
        
        # raise error if user has no points row
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found in User_Points table")
        
        # get the species code
        specCode = stats.findSpecCode(bird_name)

        # estimate bird's rarity
        proportion = stats.get_species_proportion(specCode, lat, lng)
        
        # get distance if no proportion data exists
        if(proportion == 0):
            dist = stats.bu.get_nearest_dist(specCode, lat, lng)
        else:
            dist = 0

        # the points to add to current points
        add_points = stats.calculatePoints(proportion, dist)

        # get the correct amount of points by adding previous points to added points
        points = add_points + response.data[0]["points"]

        # access database to update points
        response = supabase.table("User_Points").update({"points": points}).eq("user_id", user_id).execute()
    
        return {
            "points": response.data[0]["points"]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# this needs to call the update points function, which will in turn call the cnn backend function
# ChatGPT base code
ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
MAX_FILE_SIZE = 10 * 1024 * 1024    # 10MB
@router.post("/upload")
async def upload_photo(lat: float,
    lng: float,
    file: UploadFile = File(...),
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_client(
            sb_url,
            sb_key,
            options=ClientOptions(auto_refresh_token=False, persist_session=False)
        )
        supabase.auth.set_session(
            access_token=credentials.credentials,
            refresh_token=""
        )
        supabase.postgrest.auth(credentials.credentials)

        # validate file type
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, "Invalid image type")

        contents = await file.read()

        # validate size
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(400, "File too large")

        # generate unique filename XX
        ext = file.filename.split(".")[-1]
        filename = f'{current_user.id}/{uuid.uuid4()}.{ext}'

        # upload to supabase storage
        supabase.storage.from_('user_bird_images').upload(
            filename,
            contents,
            {"content-type": file.content_type}
        )

        # store metadata in database
        # id, user_id, file_path, url, created_at
        result = supabase.table('User_Photos').insert({
            "user_id": current_user.id,
            "file_path": filename,
        }).execute()
        
        bird_prediction = await cnn.predict_image(contents)
        bird_name = bird_prediction['BirdType']
        print(f"DEBUG: bird_name = '{bird_name}'")
        specCode = stats.findSpecCode(bird_name)
        print(f"DEBUG: specCode = '{specCode}'")
        print(bird_name)
        update_points(bird_name, lat, lng, current_user.id, credentials.credentials)

        return {
            "message": "Upload successful",
            "bird": bird_name,
            "photo_id": result.data[0]['id']
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

