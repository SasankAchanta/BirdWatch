import requests
from geopy import distance as dt
import math
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# load the environment variables from .env file
# birdUtils is designed to handle all interaction with eBird API
load_dotenv()
ebird_key = os.getenv('EBIRD_KEY')

# returns json of all ~12,000 birds' taxonomy data
# ex: bird's name, species code, etc.
def get_taxonomy():
    url = "https://api.ebird.org/v2/ref/taxonomy/ebird" 
    headers = { "X-eBirdApiToken": ebird_key }
    params = { 
        "fmt": "json" 
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

# returns number of hotspots in an area
def get_total_hotspots(lat, lng, dist, back):
    recentOb = f'https://api.ebird.org/v2/ref/hotspot/geo'
    headers = {
        'X-eBirdApiToken': ebird_key
    }
    params = {
        'lat': lat,
        'lng': lng,
        'dist': dist,   # only get hotspots within this radius (km)
        'back': back,   # only get hotspots updated since {back} days ago
        'fmt': 'json',
    }
    totalResp = requests.get(url=recentOb, headers=headers, params=params)
    totalResp.raise_for_status()
    totalData = totalResp.json()

    return len(totalData)

# returns number of hotspots in an area that have seen a given species
def get_species_hotspots(specCode, lat, lng, dist, back):
    # recent observation of a specific species
    recentObSpec = f'https://api.ebird.org/v2/data/obs/geo/recent/{specCode}'
    headers = {'X-eBirdApiToken': ebird_key}
    params = {
        'lat': lat,
        'lng': lng,
        'dist': dist,   # radius of search
        'back': back,   # only hotspots active within last {back} days
        'hotspot': True
    }
    speciesResp = requests.get(url=recentObSpec, headers=headers, params=params)
    speciesResp.raise_for_status()
    specData = speciesResp.json()

    return len(specData)

# returns the distance from the user to the nearest sighting of a given species
def get_nearest_dist(specCode, lat, lng):
    nearbyObSpec = f'https://api.ebird.org/v2/data/nearest/geo/recent/{specCode}'
    headers = {'X-eBirdApiToken': ebird_key}
    params = {
        'lat': lat,
        'lng': lng,
        'back': 30,
        'maxResults': 3
    }
    speciesResp = requests.get(url=nearbyObSpec, headers=headers, params=params)
    speciesResp.raise_for_status()
    specData = speciesResp.json()

    if(len(specData) > 0 and specData[0].get('lat') != None):
        nearby_observation = specData[0]
        obs_lat = nearby_observation.get('lat')
        obs_lng = nearby_observation.get('lng')
        return dt.distance((lat, lng), (obs_lat, obs_lng)).km
    
    else:   # no observations of species exist
        return 10000    # return large distance



    