import requests
from fastapi import FastAPI
from pydantic import BaseModel
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# uvicorn

# load the environment variables from .env into url and sb_key
load_dotenv()
sb_url = os.getenv("SUPABASE_URL")
sb_key = os.getenv("SUPABASE_KEY")

# create the supabase client (connect to the database)
supabase = create_client(sb_url, sb_key)

# "app" is how we can make the front end calls
app = FastAPI() 

# the user response to signing in; the user is needed in order to get the user_id in the database
auth_resp = supabase.auth.sign_in_with_password({
    "email": "", 
    "password": ""
})

@app.post()
def post_points():
    auth_resp = supabase.auth.sign_in_with_password({
        "email": "", 
        "password": ""
    })
    return supabase.table("User_Points").select("points").execute


# get the points from the database and return them to the front end
@app.get("/points")
def get_points():
    auth_resp = supabase.auth.sign_in_with_password({
        "email": "", 
        "password": ""
    })
    return supabase.table("User_Points").select("points").execute

# this is the data checking (lat and lng MUST be floats; pydantic check it)
class Location(BaseModel):
    lat: float
    lng: float

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

#def post_picture():

#def get_picture():
