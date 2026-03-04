import requests
import pandas as pd         # pandas is a library for working with data in tables (i.e. read, organize into cols and rows, analyze, filer, sort, modify, and save data)
# main object in pandas is DataFrame (basically a table)
import os      
from pprint import pprint as pp         # pretty print
import math        #for calculating points

# API key to access eBird
API_KEY = '8293oj5n61sq'

# the base number of points someone can get
BASE_POINTS = 100

# the constant number to prevent dividing by zero
CONST = 1

'''
# URL for getting the list of species & their codes
url = "https://api.ebird.org/v2/ref/taxonomy/ebird" 

# Headers - information that is sent before the request (like a package label; they may include who you are, how you want the data formatted, or, in this case, and authentication key)
# X-eBirdApiToken - the label for the API key; this label is what is expected BY eBird API when looking for the API key; look in API documentation to find what you should label the token
headers = { "X-eBirdApiToken": API_KEY }

# Params - parameters sent with a request to tell the server WHAT data is wanted, and in what format ("fmt"; i.e. JSON or CSV)
# Usually get attached to URL 
    # CSV is best for looking at data; it can be brought to excel easily
# QUERY parameters, not URL parameters
params = { 
    "fmt": "json" 
}

# Response will hold the entire response from HTTP: gives status code (whether or not it actually worked), the data (i.e. JSON formatted), and headers from the server
response = requests.get(url, headers=headers, params=params)

# creating the file:
# with...as f - allows opening and modifying a file without having to manually close it
# open('fileName', 'w/r', encoding='encodeType') - opens the given file (fileName) in order to write or read (w/r)
# w = write to the file (create the file if not already created, if already created overwrite current text)
# encodeType = the way text characters are converted to bytes (utf-8 is most common as it supports all characters, even special ones)

with open('/Users/aydahusby/Desktop/AIM/eBird_List.json', 'w', encoding='utf-8') as f:
    # response.text is the data from the request as text (just writing the data to the file)
    f.write(response.text)

    
# converting the file into excel spreadsheat (.xlsx):
# create a dataframe with pandas (a data table) out of the csv file created earlier
df = pd.read_csv('eBird_List.json')


# create an excel spreadsheet out of the csv file
# index=False - by default there is an extra column made by pandas for the index of the table; this removes that column 
df.to_excel('eBird_List.xlsx', index=False)


speciesCode = 'whwdov'

# url for getting species data from longitude and latitude
url2 = f'https://api.ebird.org/v2/data/obs/geo/recent/{speciesCode}'

headers = {
    'X-eBirdApiToken': API_KEY
}

# parameters for the specific location is longitude, latitude, and radius (dist)
params = {
    'lat': 32.7767,     # longitude 
    'lng': -96.7970,    # latitude
    'dist': 50          # search radius in km (default is 25km)
}

resp = requests.get(url=url2, headers=headers, params=params)

data = resp.json()
total = 0

print(resp.raise_for_status)

for entry in data:
    # entry.get('key', insteadOfKey) - if there IS the key you're looking for, use that value. if not, use insteadOfKey value
    total += entry.get('howMany', 0)
print(f"Species: {data[1]['comName']} \nTotal: {total}")


bird = {
    'species': data[1]['comName'],
    'total': total
}



# get data from region code instead of lng/lat

regionCode = 'US-TX'
speciesCode = 'whwdov'

url2 = f'https://api.ebird.org/v2/data/obs/{regionCode}/recent/{speciesCode}'

headers = {
    'X-eBirdApiToken': API_KEY
}

resp = requests.get(url=url2, headers=headers)

data = resp.json()
totalWWD = 0
for entry in data:
    totalWWD += entry.get('howMany', 0)
print(f"Species: {data[1]['comName']} \nTotal: {totalWWD}")
'''


BASE_POINTS = 100
BIG_BONUS = 1000


# URL for getting the list of species & their codes
url = "https://api.ebird.org/v2/ref/taxonomy/ebird" 

# Headers - information that is sent before the request (like a package label; they may include who you are, how you want the data formatted, or, in this case, and authentication key)
# X-eBirdApiToken - the label for the API key; this label is what is expected BY eBird API when looking for the API key; look in API documentation to find what you should label the token
headers = { "X-eBirdApiToken": API_KEY }

# Params - parameters sent with a request to tell the server WHAT data is wanted, and in what format ("fmt"; i.e. JSON or CSV)
# Usually get attached to URL 
    # CSV is best for looking at data; it can be brought to excel easily
# QUERY parameters, not URL parameters
params = { 
    "fmt": "json" 
}

# Response will hold the entire response from HTTP: gives status code (whether or not it actually worked), the data (i.e. JSON formatted), and headers from the server
response = requests.get(url, headers=headers, params=params)

# creating the file:
# with...as f - allows opening and modifying a file without having to manually close it
# open('fileName', 'w/r', encoding='encodeType') - opens the given file (fileName) in order to write or read (w/r)
# w = write to the file (create the file if not already created, if already created overwrite current text)
# encodeType = the way text characters are converted to bytes (utf-8 is most common as it supports all characters, even special ones)

BIRD_LIST = response.json()

'''
with open('/Users/aydahusby/Desktop/AIM/eBird_List.json', 'w', encoding='utf-8') as f:
    # response.text is the data from the request as text (just writing the data to the file)
    f.write(response.text)
'''

def findSpecCode(comName):
    for item in BIRD_LIST:
        if (item['comName']).lower() == comName.lower():
            return item['speciesCode']
    return('Not Found')


# prompt user for bird name and longitude/latitude
species = input('Please input the bird name: ')

# get the species code
specCode = findSpecCode(species)

lat = 32.77
# input('Please input your latitude (2 decimal places): ')

lng = -96.79
# input('Please input your longitude (2 decimal places): ')

# set up the URL, header, and parameters for the eBird API request

# recent observation of a specific species (specific)
recentObSpec = f'https://api.ebird.org/v2/data/obs/geo/recent/{specCode}'

headers = {
    'X-eBirdApiToken': API_KEY
}

params = {
    'lat': lat,
    'lng': lng,
    'dist': 50
}

# make the API request 
speciesResp = requests.get(url=recentObSpec, headers=headers, params=params)

# convert the data response into a json format
specData = speciesResp.json()

# calculate the total population within a 50km radius
totalSpecPop = 0
for item in specData:
    totalSpecPop += item.get('howMany', 0)



# recent observation of birds (total)
recentOb = f'https://api.ebird.org/v2/data/obs/geo/recent'

headers = {
    'X-eBirdApiToken': API_KEY
}

params = {
    'lat': lat,
    'lng': lng,
    'dist': 50,
    # back = number of days back for observations (max = 30, default = 14)
    'back': 30
}

totalResp = requests.get(url=recentOb, headers=headers, params=params)

totalData = totalResp.json()


totalPop = 0
for item in totalData:
    totalPop += item.get('howMany', 0)

print(f'species total: {totalSpecPop}\n')
print(f'total birds: {totalPop}\n')

'''
totalAndConst = totalPop + CONST

print(f'Total pop + CONST value: {totalAndConst}')

totalDivBytotal = totalSpecPop/totalAndConst
print(f'Total Species / Total Birds: {totalDivBytotal}')
'''


def calculatePoints(total_birds, total_species):
    if(total_species == 0):
        return BIG_BONUS
    
    ratio = 1 - (total_species/total_birds)
    points = round(BASE_POINTS * ratio + CONST)
    if(points == 0):
        return points + 1
    return points



specCode = findSpecCode('White-winged duck')
print(specCode)

points = calculatePoints(totalPop, totalSpecPop)
print(points)
