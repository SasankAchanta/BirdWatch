import requests
from geopy import distance as dt
import math
from fastapi import FastAPI
from pydantic import BaseModel

# this will be where we can make the front end calls
app = FastAPI() 

# this is the data checking (lat and lng MUST be floats; pydantic check it)
class Location(BaseModel):
    lat: float
    lng: float
