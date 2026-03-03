import requests
import pandas as pd         # pandas is a library for working with data in tables (i.e. read, organize into cols and rows, analyze, filer, sort, modify, and save data)
# main object in pandas is DataFrame (basically a table)
import os      
from pprint import pprint as pp         # pretty print

API_KEY = '8293oj5n61sq'

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



# prompt user for bird name and longitude/latitude
species = input('Please input the bird name: ')

lat = input('Please input your latitude: ')

lng = input('Please input your longitude: ')

# set up the URL, header, and parameters for the eBird API request
specLocLonLat = f'https://api.ebird.org/v2/data/obs/geo/recent/{species}'

headers = {
    'X-eBirdApiToken': API_KEY
}

params = {
    'lat': lat,
    'lng': lng,
    'dist': 50
}

# make the API request 
dataResp = requests.get(url=specLocLonLat, headers=headers, params=params)

# convert the data response into a json format
data = dataResp.json()

# calculate the total population within a 50km radius
totalPop = 0
for item in data:
    totalPop += item.get('howMany', 0)





