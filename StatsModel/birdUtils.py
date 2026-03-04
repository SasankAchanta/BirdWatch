import requests

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

# Returns the proportion of total birds that are a specific species
def get_species_proportion(specCode, lat, lng):
    all_birds = get_total_population(lat, lng)
    species_birds = get_species_population(specCode, lat, lng)
    return all_birds / species_birds

# Returns total population of ALL birds at a given location
def get_total_population(lat, lng):
    recentOb = f'https://api.ebird.org/v2/data/obs/geo/recent'
    headers = {
        'X-eBirdApiToken': API_KEY
    }
    params = {
        'lat': lat,
        'lng': lng,
        'dist': 50,
        # back = number of days back for observations (max = 30, default = 14)
        'back': 29
    }
    totalResp = requests.get(url=recentOb, headers=headers, params=params)
    totalData = totalResp.json()

    totalPop = 0
    for item in totalData:
        totalPop += item.get('howMany', 0)

    return totalPop

# Returns population of ONE SPECIES of bird at a given location
def get_species_population(specCode, lat, lng):
    # recent observation of a specific species
    recentObSpec = f'https://api.ebird.org/v2/data/obs/geo/recent/{specCode}'
    headers = {'X-eBirdApiToken': API_KEY}
    params = {
        'lat': lat,
        'lng': lng,
        'dist': 50,
        'back': 29
    }
    speciesResp = requests.get(url=recentObSpec, headers=headers, params=params)
    specData = speciesResp.json()

    # calculate the total spec population within a 50km radius
    totalSpecPop = 0
    for item in specData:
        totalSpecPop += item.get('howMany', 0)

    return totalSpecPop