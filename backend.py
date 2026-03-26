import requests
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os
from supabase import ClientOptions, create_client, Client
from dotenv import load_dotenv

# load the environment variables from .env into url and sb_key
load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

# whenever accessed, looks for a bearer token (a token holding user token needed for auth checking)
security = HTTPBearer()

# get the currently logged in user
def get_current_user(
        # formats request header to easily extract the token needed to determine the current user 
        credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    response = supabase.get_user(token)
    
    if not response or not response.user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return response.user

# create the supabase client (connect to the database)
supabase: Client = create_client(sb_url, sb_key, options=ClientOptions(auto_refresh_token=False, persist_session=False))

# "app" is how we can make the front end calls
app = FastAPI()

# this is the data checking (lat and lng MUST be floats; pydantic check it)
class Location(BaseModel):
    lat: float
    lng: float

class PointsChangeRequest(BaseModel):
    num_points: int

# the current location of the user; updated after call of the /location endpoint
curr_location: Location


# a decorator; the endpoint the front end will call and the function IMMEDIATELY after will be run
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


# update the points whenever a picture is taken 
@app.post("/get_points")
def get_points(current_user=Depends(get_current_user)): 
    try:
        user_id = current_user.id
        
        response = supabase.table("User_Points").select("*").eq("user_id", user_id).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/get_points")
def post_points(points: PointsChangeRequest, current_user=Depends(get_current_user)): 
    try:
        user_id = current_user.id
        
        response = supabase.table("User_Points").update({"points": points.num_points}).eq("user_id", user_id).execute()
        return response.data
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
'''