from email.policy import HTTP

import requests
from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os
from supabase import ClientOptions, create_client, Client
from dotenv import load_dotenv
import logging
import stats
import auth

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

# "app" is how we can make the front end calls
app = FastAPI()

# add into this "main" file the endpoints of auth (using auth's router)
app.include_router(auth.router)

# this is the data checking (lat and lng MUST be floats; pydantic check it)
class Location(BaseModel):
    lat: float
    lng: float

# get the name of the bird and lng/lat from frontend
# frontent gets:
    # bird_name from AI model and store it in variable to send here
    # lat and lng from API and stores to send her
class BirdRequest(BaseModel):
    bird_name: str
    lat: float
    lng: float

# the current location of the user; updated after call of the /location endpoint
curr_location: Location

# a decorator; the endpoint the front end will call and the function IMMEDIATELY after will be run

# get the user's points to display
@app.get("/get_points")
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
@app.patch("/update_points")
def update_points(bird: BirdRequest, 
                  current_user=Depends(auth.get_current_user),
                  credentials: HTTPAuthorizationCredentials = Depends(security)): 
    try:
        user_id = current_user.id

        # authorize the user to access database
        supabase.postgrest.auth(credentials.credentials)

        #access database to get current points
        response = supabase.table("User_Points").select("points").eq("user_id", user_id).execute()
        
        # raise error if user has no points row
        if not response.data:
            raise HTTPException(status_code=404, detail="User not found in User_Points table")
        
        # get the species code
        specCode = stats.findSpecCode(bird.bird_name)

        # estimate bird's rarity
        proportion = stats.get_species_proportion(specCode, bird.lat, bird.lng)
        
        # get distance if no proportion data exists
        if(proportion == 0):
            dist = stats.bu.get_nearest_dist(specCode, bird.lat, bird.lng)
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


'''
@app.post("/add_picture")
def add_picture():
    try:
    
    except Exception as e:

@app.get("/get_picture")
def get_picture():
    try:

    except Exception as e:
    
    
@app.post("/location") 
def get_location(location: Location):
    global curr_location
    curr_location = location
    return {"message": "Location received successfully"}

# 
@app.get("/location")
def send_location():
    if curr_location is None:
        return {"message": "Location not set"}
    return {"lat: ": curr_location.lat, "lng: ": curr_location.lng}

'''