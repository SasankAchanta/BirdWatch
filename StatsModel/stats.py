import requests
import pandas as pd
import os      
from pprint import pprint as pp     # pretty print
import math
import birdUtils as bu

API_KEY = '8293oj5n61sq'

# constants for point calculation
BASE_POINTS = 100
BIG_BONUS = 1000
CONST = 1

# Generates a look up table for bird name -> species code
BIRD_LIST = bu.get_taxonomy()
NAME_CODE_DICT = {
    item['comName'].lower(): item['speciesCode']
    for item in BIRD_LIST
}

# Function for converting bird name -> species code
def findSpecCode(comName):
    return NAME_CODE_DICT.get(comName.lower())

# helper function for get_species_proportion
# adjusts proportion to account for confidence in rarity
# (lower confidence in rarity -> assumes less rarity -> less points)
def adjust_raw_proportion(numerator, denominator):
    p = (numerator + .4 * 3) / (denominator + 3)
    std_error = math.sqrt(p * (1-p) / denominator)
    return p + std_error

# returns the estimated proportion of hotspots that have seen a given bird species
def get_species_proportion(specCode, lat, lng):
    close_hotspots = bu.get_total_hotspots(lat, lng, 25, 14)
    close_species_spots = bu.get_species_hotspots(specCode, lat, lng, 25, 14)
    wide_search_needed = False

    if(close_hotspots < 10 or close_species_spots == 0):    # if close search is bad, do wider search
        far_hotspots = bu.get_total_hotspots(lat, lng, 50, 30)
        far_species_spots = bu.get_species_hotspots(specCode, lat, lng, 50, 30)
        wide_search_needed = True
    
    if(wide_search_needed):
        if(far_hotspots == 0):  # if no hotspots are near user, assume bird has common rarity
            return 0.5
        else:  
            print(f'Total hotspots: {far_hotspots}')
            return adjust_raw_proportion(far_species_spots, far_hotspots)
        
    return adjust_raw_proportion(close_species_spots, close_hotspots)

# points rewarded to user based on bird's rarity (given by proportion)
def calculatePoints(proportion):
    multiplier = 1
    if(proportion > .65):    # bird is very common -> low multiplier
        multiplier = 0.1
    else:  
        multiplier = (1.460 * proportion - 0.948) ** 2 + 0.1
    points = round(multiplier * BASE_POINTS)
    
    if(points < .1 * BASE_POINTS):
        points = .1 * BASE_POINTS
    elif(points > BASE_POINTS):
        points = BASE_POINTS
    return points
    
def main():
    # prompt user for bird name and longitude/latitude
    species = input('Please input the bird name: ')
    lat = input('Please input your latitude (2 decimal places): ')
    lng = input('Please input your longitude (2 decimal places): ')

    # get the species code
    specCode = findSpecCode(species)

    # estimate bird's rarity
    proportion = get_species_proportion(specCode, lat, lng)

    print(f'Proportion of hotspots that species was found (upper bound): {proportion}')

    points = calculatePoints(proportion)
    print(f'Points rewarded: {points}')

if __name__ == '__main__':
    main()

