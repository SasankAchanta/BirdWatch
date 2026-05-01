from calendar import c
from email.policy import HTTP
from multiprocessing import current_process
import stat
import uuid
from grpc import ssl_server_certificate_configuration
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
import Backend.wikiUtils as wikiUtils

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

def create_supabase_session(credentials):
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
    return supabase

# get the user's points and username to display
@router.get("/get_points")
def get_points(current_user=Depends(auth.get_current_user), 
               credentials: HTTPAuthorizationCredentials = Depends(security)): 
    try:
        user_id = current_user.id

        supabase = create_supabase_session(credentials)
        
        response = supabase.table("User_Points").select("points").eq("user_id", user_id).execute()
        
        # get the username of te user and return it
        username = current_user.user_metadata.get("display_name")
        # raise error if user has no points row
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found in User_Points table")
        
        return {
            # return ONLY ONE row in the points column
            "points": response.data[0]["points"],
            "username": username
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
            "points": response.data[0]["points"],
            "points_added": add_points
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# this needs to call the update points function, which will in turn call the cnn backend function
# ChatGPT base code
ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
MAX_FILE_SIZE = 20 * 1024 * 1024    # 20MB
@router.post("/upload")
async def upload_photo(lat: float,
    lng: float,
    file: UploadFile = File(...),
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)

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
        
        # get the prediction of the bird and update user points 
        bird_prediction = await cnn.predict_image(contents)
        bird_name = bird_prediction['BirdType']
        num_points = update_points(bird_name, lat, lng, current_user.id, credentials.credentials)

        points_added = num_points["points_added"]
        if(points_added <= 200):
            rarity = "Common"
        elif(200 < points_added <= 400 ):
            rarity = "Uncommon"
        elif(400 < points_added <= 600):
            rarity = "Rare"
        elif(600 < points_added <= 800):
            rarity = "Mythic"
        elif(points_added > 800):
            rarity = "Legendary"

        # update the bird_checklist
        checklist_response = supabase.table('bird_checklist').select('birds').eq('id', current_user.id).execute()
        checklist = checklist_response.data[0]['birds']
        if checklist.get(bird_name) is False:
            # set value to true
            checklist[bird_name] = True
            supabase.table('bird_checklist').update({'birds': checklist}).eq('id', current_user.id).execute()
       
       # add else so that user gets less points if they already caught the bird
        return {
            "message": "Upload successful",
            "bird": bird_name,
            "photo_id": result.data[0]['id'],
            "added_points": points_added,
            "rarity": rarity
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get_photos")
def get_photos(
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)

        result = supabase.table("User_Photos") \
        .select('id','file_path', 'created_at') \
        .eq('user_id', current_user.id) \
        .execute()

        # create temporary url's for frontend to access photos
        for photo in result.data:
            signed_url = supabase.storage.from_('user_bird_images') \
            .create_signed_url(photo['file_path'], 3600)    # expires in 1hr
            photo['url'] = signed_url["signedUrl"]

        return{
            "photos": result.data
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# one endpoint for main bird-dex info
@router.get('/get_card_info')
def get_info(
    bird_name: str,
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)
        
        # gets summary
        print(f"Querying for: '{bird_name.upper()}'")
        result = supabase.table("birds") \
            .select('summary') \
            .eq('name', bird_name.upper()) \
            .execute()
        print(f"Result: {result.data}")
        summary = result.data

        # get image
        result = supabase.table("birds") \
        .select('image_path') \
        .eq('name', bird_name.upper()) \
        .execute()
        img_url = result.data

        # get map
        result = supabase.table("birds") \
        .select('map_path') \
        .eq('name', bird_name.upper()) \
        .execute()
        map_url = result.data

        return{
            'summary': summary,
            'img_url. ': img_url,
            "map_url. ": map_url
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# get summary for pokedex from Supabase
@router.get("/get_summary")
def get_summary(
    bird_name: str,
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)
        
        print(f"Querying for: '{bird_name.upper()}'")
        result = supabase.table("birds") \
            .select('summary') \
            .eq('name', bird_name.upper()) \
            .execute()
        print(f"Result: {result.data}")
        return{
            "summary": result.data
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# get image for pokedex from Supabase
@router.get("/get_wiki")
def get_wiki(
    bird_name: str,
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        wiki_title = wikiUtils.transform_bird_name(bird_name)
        url = f"https://en.wikipedia.org/wiki/{wiki_title}"
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# get image for pokedex from Supabase
@router.get("/get_image")
def get_image(
    bird_name: str,
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)
        
        result = supabase.table("birds") \
        .select('image_path') \
        .eq('name', bird_name.upper()) \
        .execute()

        return{
            "img_url. ": result.data
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# get map for pokedex from Supabase
@router.get("/get_map")
def get_map(
    bird_name: str,
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)
        
        result = supabase.table("birds") \
        .select('map_path') \
        .eq('name', bird_name.upper()) \
        .execute()

        return{
            "map_url. ": result.data
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# return entire hashmap for that user
@router.get("/get_caught_birds")
def get_caught(
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)

        result = supabase.table('bird_checklist').select('birds').eq('id', current_user.id).execute()
        return{
            "bird checklist": result.data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail= str(e))

@router.get("/get_leaderboard")
def get_leaderboard(
    current_user=Depends(auth.get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        supabase = create_supabase_session(credentials)

        # order points in descending order
        result = supabase.table('User_Points').select('username, points').order("points", desc=True).execute()
        
        if not result.data:
            return{
                "leaderboard": []
            }
        return{
            "leaderboard": result.data
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail= str(e))