# **Claude Code**
# Overrides for CNN names that don't match eBird common names after simple title-casing.
# Key:   CNN output (title-cased, as produced by normalize_cnn_name)
# Value: eBird common name (exact match in eBird taxonomy)

OVERRIDES = {
    # Typos / shortened names
    "Mallard Duck":               "Mallard",
    "Mandrin Duck":               "Mandarin Duck",
    "Touchan":                    "Toco Toucan",
    "Albatross":                  "Wandering Albatross",       # too generic; pick your preferred default
    "Blue Heron":                 "Great Blue Heron",
    "Frigate":                    "Magnificent Frigatebird",
    "Crow":                       "American Crow",
    "Canary":                     "Island Canary",
    "Cockatoo":                   "Sulphur-crested Cockatoo",
    "Myna":                       "Common Myna",
    "Peacock":                    "Indian Peafowl",
    "Puffin":                     "Atlantic Puffin",
    "Kiwi":                       "North Island Brown Kiwi",
    "Ostrich":                    "Common Ostrich",
    "Roadrunner":                 "Greater Roadrunner",
    "Cassowary":                  "Southern Cassowary",
    "Emu":                        "Emu",
    "Looney Birds":               None,                        # not a real species; handle as unknown
    "Teal Duck":                  "Green-winged Teal",
    "Rock Dove":                  "Rock Pigeon",
    "Killdear":                   "Killdeer",                  # typo in your list
    "Auckland Shaq":              "Auckland Shag",
    "Imperial Shaq":              "Imperial Shag",
    "Brandt Cormarant":           "Brandt's Cormorant",
    "Double Brested Cormarant":   "Double-crested Cormorant",
    "Blackburniam Warbler":       "Blackburnian Warbler",
    "Brown Crepper":              "Brown Creeper",
    "Brown Noody":                "Brown Noddy",
    "Cock Of The  Rock":          "Andean Cock-of-the-rock",
    "Hoopoes":                    "Eurasian Hoopoe",
    "Samatran Thrush":            "Sumatran Thrush",
    "Parus Major":                "Great Tit",                 # scientific name in your list
    "Tit Mouse":                  "Tufted Titmouse",
    "Trumpter Swan":              "Trumpeter Swan",
    "Ovenbird":                   "Ovenbird",
    "Bird Of Paradise":           "Greater Bird-of-Paradise",
    "Wilsons Bird Of Paradise":   "Wilson's Bird-of-Paradise",
    "Flame Tanager":              "Flame-colored Tanager",
    "Looney Birds":               None,
    "Sand Martin":                "Sand Martin",               # same in eBird (UK name) — ok
    "Groved Billed Ani":          "Groove-billed Ani",
    "Spoon Biled Sandpiper":      "Spoon-billed Sandpiper",
    "Stripped Manakin":           "Striated Manakin",
    "Stripped Swallow":           "Streak-throated Swallow",
    "Vermilion Flycather":        "Vermilion Flycatcher",      # typo
    "Venezuelian Troupial":       "Venezuelan Troupial",
    "Eastern Towee":              "Eastern Towhee",            # typo
    "Eastern Wip Poor Will":      "Eastern Whip-poor-will",
}