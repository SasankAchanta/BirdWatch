import requests
import math

# birdUtils is designed to handle all interaction with eBird API

API_KEY = '8293oj5n61sq'

# returns json of all ~12,000 birds' taxonomy data
# ex: bird's name, species code, etc.
def get_taxonomy():
    url = "https://api.ebird.org/v2/ref/taxonomy/ebird" 
    headers = { "X-eBirdApiToken": API_KEY }
    params = { 
        "fmt": "json" 
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

# returns number of hotspots in an area
def get_total_hotspots(lat, lng, dist, back):
    recentOb = f'https://api.ebird.org/v2/ref/hotspot/geo'
    headers = {
        'X-eBirdApiToken': API_KEY
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
    headers = {'X-eBirdApiToken': API_KEY}
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
    