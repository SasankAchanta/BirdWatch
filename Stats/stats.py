from json import load
import requests
import pandas as pd
import os      
from pprint import pprint as pp     # pretty print
import math
import Stats.birdUtils as bu
from dotenv import load_dotenv
# from backend import curr_location

#lng = curr_location.lng
#lat = curr_location.lat

# constants for point calculation
BASE_POINTS = 500
MAX_POINTS = 1000

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
    if(numerator == 0):
        return 0
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
        if(far_hotspots == 0):  # if no hotspots are near user
            return 0  # TO-DO: what if there's absolutely no data? no sightings, no hotspots
        else:  
            return adjust_raw_proportion(far_species_spots, far_hotspots)
        
    return adjust_raw_proportion(close_species_spots, close_hotspots)

# points rewarded to user based on bird's rarity (given by proportion & distance)
def calculatePoints(proportion, distance):
    multiplier = 1
    if(proportion > .65):    # bird is very common -> low multiplier
        multiplier = 0.1
        points = round(multiplier * BASE_POINTS)
    elif(proportion > 0):
        multiplier = (1.46 * proportion - .9485) ** 2 + 0.1
        points = round(multiplier * BASE_POINTS)
    else:   # proportion = 0
        if(distance <= 100):
            multiplier = 9.2 * (distance / 1000) + 0.1
        else:
            exponential = math.exp(-1.3 * (distance / 1000 - 3))
            multiplier = 1 / (1 + exponential) + 1
        points = round(multiplier * BASE_POINTS)
    
    if(points < .1 * BASE_POINTS):
        points = .1 * BASE_POINTS
    elif(points > MAX_POINTS):
        points = MAX_POINTS
    return points
    
'''
if __name__ == '__main__':
    while(True):
        print('\n')
        main()

'''