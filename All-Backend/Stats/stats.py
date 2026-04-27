from json import load
import requests
import pandas as pd
import os      
from pprint import pprint as pp     # pretty print
import math
import Stats.birdUtils as bu
from dotenv import load_dotenv
from rapidfuzz import process, fuzz
from Backend.name_map import OVERRIDES

# constants for point calculation
BASE_POINTS = 500
MAX_POINTS = 1000

# Generates a look up table for bird name -> species code
BIRD_LIST = None

def get_bird_list():
    global BIRD_LIST
    if BIRD_LIST is None:
        BIRD_LIST = bu.get_taxonomy()
    return BIRD_LIST

NAME_CODE_DICT = None

def get_name_code_dict():
    global NAME_CODE_DICT
    if NAME_CODE_DICT is None:
        NAME_CODE_DICT = {
            item['comName'].upper(): item['speciesCode']
            for item in get_bird_list()
        }
    return NAME_CODE_DICT

# Overrides for CNN names that don't match eBird after uppercasing.
# Key:   CNN output (uppercased)
# Value: eBird common name (uppercased) — or None if not a real species
CNN_OVERRIDES = {
    # Generic / ambiguous names
    "ALBATROSS":                "WANDERING ALBATROSS",
    "BLUE HERON":               "GREAT BLUE HERON",
    "CROW":                     "AMERICAN CROW",
    "CANARY":                   "ISLAND CANARY",
    "COCKATOO":                 "SULPHUR-CRESTED COCKATOO",
    "MYNA":                     "COMMON MYNA",
    "PEACOCK":                  "INDIAN PEAFOWL",
    "PUFFIN":                   "ATLANTIC PUFFIN",
    "KIWI":                     "NORTH ISLAND BROWN KIWI",
    "OSTRICH":                  "COMMON OSTRICH",
    "ROADRUNNER":               "GREATER ROADRUNNER",
    "CASSOWARY":                "SOUTHERN CASSOWARY",
    "FRIGATE":                  "MAGNIFICENT FRIGATEBIRD",
    "BIRD OF PARADISE":         "GREATER BIRD-OF-PARADISE",
    "TEAL DUCK":                "GREEN-WINGED TEAL",
    # Extra/wrong word
    "MALLARD DUCK":             "MALLARD",
    "MANDRIN DUCK":             "MANDARIN DUCK",
    "ROCK DOVE":                "ROCK PIGEON",
    "HOOPOES":                  "EURASIAN HOOPOE",
    # Typos in CNN label list
    "TOUCHAN":                  "TOCO TOUCAN",
    "KILLDEAR":                 "KILLDEER",
    "BLACKBURNIAM WARBLER":     "BLACKBURNIAN WARBLER",
    "BROWN CREPPER":            "BROWN CREEPER",
    "BROWN NOODY":              "BROWN NODDY",
    "COCK OF THE  ROCK":        "ANDEAN COCK-OF-THE-ROCK",
    "SAMATRAN THRUSH":          "SUMATRAN THRUSH",
    "GROVED BILLED ANI":        "GROOVE-BILLED ANI",
    "SPOON BILED SANDPIPER":    "SPOON-BILLED SANDPIPER",
    "STRIPPED MANAKIN":         "STRIATED MANAKIN",
    "STRIPPED SWALLOW":         "STREAK-THROATED SWALLOW",
    "VERMILION FLYCATHER":      "VERMILION FLYCATCHER",
    "VENEZUELIAN TROUPIAL":     "VENEZUELAN TROUPIAL",
    "EASTERN TOWEE":            "EASTERN TOWHEE",
    "EASTERN WIP POOR WILL":    "EASTERN WHIP-POOR-WILL",
    "TRUMPTER SWAN":            "TRUMPETER SWAN",
    "BRANDT CORMARANT":         "BRANDT'S CORMORANT",
    "DOUBLE BRESTED CORMARANT": "DOUBLE-CRESTED CORMORANT",
    "AUCKLAND SHAQ":            "AUCKLAND SHAG",
    "IMPERIAL SHAQ":            "IMPERIAL SHAG",
    "WILSONS BIRD OF PARADISE": "WILSON'S BIRD-OF-PARADISE",
    "FLAME TANAGER":            "FLAME-COLORED TANAGER",
    # Scientific name in CNN list
    "PARUS MAJOR":              "GREAT TIT",
    "TIT MOUSE":                "TUFTED TITMOUSE",
    # Not a real species
    "LOONEY BIRDS":             None,
    "AFRICAN CROWNED CRANE":      "Gray Crowned-Crane",
    "Fairy Penguin":      "African Penguin"
}

def findSpecCode(comName):
    if not comName:
        return None
    
    upper_name = comName.upper().strip()

   # 1 — check override map first (handles typos + ambiguous CNN names)
    if upper_name in CNN_OVERRIDES:
        ebird_name = CNN_OVERRIDES[upper_name]
        if ebird_name is None:
            print(f"WARNING: '{comName}' is not a real species")
            return None
        return get_name_code_dict().get(ebird_name)

    # 2 — exact match against eBird taxonomy (handles the ~90% of clean names)
    result = get_name_code_dict().get(upper_name)
    if result:
        return result
    # 3 — nothing found
    print(f"WARNING: Could not find species code for '{comName}'")
    return None


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
    