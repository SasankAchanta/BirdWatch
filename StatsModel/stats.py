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

# loads json of all birds in eBird
BIRD_LIST = bu.get_taxonomy()

# Generates a look up table for bird name -> species code
NAME_CODE_DICT = {
    item['comName'].lower(): item['speciesCode']
    for item in BIRD_LIST
}

# Function for converting bird name -> species code
def findSpecCode(comName):
    return NAME_CODE_DICT.get(comName.lower())

# points rewarded to user based on bird's rarity
def calculatePoints(total_birds, total_species):
    if(total_species == 0):
        return BIG_BONUS
    
    ratio = 1 - (total_species/total_birds)
    points = round(BASE_POINTS * ratio + CONST)
    if(points == 0):
        return points + 1
    return points

def main():
    # prompt user for bird name and longitude/latitude
    species = input('Please input the bird name: ')
    lat = input('Please input your latitude (2 decimal places): ')
    lng = input('Please input your longitude (2 decimal places): ')

    # get the species code
    specCode = findSpecCode(species)

    totalSpecPop = bu.get_species_population(specCode, lat, lng)
    totalPop = bu.get_total_population(lat, lng)

    print(f'species total: {totalSpecPop}\n')
    print(f'total birds: {totalPop}\n')

    points = calculatePoints(totalPop, totalSpecPop)
    print(points)

if __name__ == '__main__':
    main()
