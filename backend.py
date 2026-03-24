import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# load the environment variables from .env into url and sb_key
load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

# create the supabase client (connect to the database)
supabase = create_client(sb_url, sb_key)

# "app" is how we can make the front end calls
app = FastAPI() 

# this is the data checking (lat and lng MUST be floats; pydantic check it)
class Location(BaseModel):
    lat: float
    lng: float

class PointsChangeRequest(BaseModel):
    email: str
    num_points: int

# the current location of the user; updated after call of the /location endpoint
curr_location: Location | None = None


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
@app.post("/update_points")
def update_points(user_info: PointsChangeRequest, token: str): 
    try:
        response = supabase.auth.get_user_by_email(user_info.email)
        user = response.user
        
        supabase.table("User_Points").select("user_id").eq(user).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#def post_picture():

#def get_picture():
