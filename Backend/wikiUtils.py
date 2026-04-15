from asyncio import streams

import requests

from svgelements import SVG, Title
from io import BytesIO
# birds = [
#     'ABBOTTS BABBLER', 'ABBOTTS BOOBY', 'ABYSSINIAN GROUND HORNBILL', 'AFRICAN CROWNED CRANE', 'AFRICAN EMERALD CUCKOO', 'AFRICAN FIREFINCH', 'AFRICAN OYSTER CATCHER', 'AFRICAN PIED HORNBILL', 'AFRICAN PYGMY GOOSE', 'ALBATROSS', 'ALBERTS TOWHEE', 'ALEXANDRINE PARAKEET', 'ALPINE CHOUGH', 'ALTAMIRA YELLOWTHROAT', 'AMERICAN AVOCET', 'AMERICAN BITTERN', 'AMERICAN COOT', 'AMERICAN DIPPER', 'AMERICAN FLAMINGO', 'AMERICAN GOLDFINCH', 'AMERICAN KESTREL', 'AMERICAN PIPIT', 'AMERICAN REDSTART', 'AMERICAN ROBIN', 'AMERICAN WIGEON', 'AMETHYST WOODSTAR', 'ANDEAN GOOSE', 'ANDEAN LAPWING', 'ANDEAN SISKIN', 'ANHINGA', 'ANIANIAU', 'ANNAS HUMMINGBIRD', 'ANTBIRD', 'ANTILLEAN EUPHONIA', 'APAPANE', 'APOSTLEBIRD', 'ARARIPE MANAKIN', 'ASHY STORM PETREL', 'ASHY THRUSHBIRD', 
#     'ASIAN CRESTED IBIS', 'ASIAN DOLLARD BIRD', 'ASIAN GREEN BEE EATER', 'ASIAN OPENBILL STORK', 'AUCKLAND SHAQ', 'AUSTRAL CANASTERO', 'AUSTRALASIAN FIGBIRD', 'AVADAVAT', 'AZARAS SPINETAIL', 'AZURE BREASTED PITTA', 'AZURE JAY', 'AZURE TANAGER', 'AZURE TIT', 'BAIKAL TEAL', 'BALD EAGLE', 'BALD IBIS', 'BALI STARLING', 'BALTIMORE ORIOLE', 'BANANAQUIT', 'BAND TAILED GUAN', 'BANDED BROADBILL', 'BANDED PITA', 'BANDED STILT', 'BAR-TAILED GODWIT', 'BARN OWL', 'BARN SWALLOW', 'BARRED PUFFBIRD', 'BARROWS GOLDENEYE', 'BAY-BREASTED WARBLER', 'BEARDED BARBET', 'BEARDED BELLBIRD', 'BEARDED REEDLING', 'BELTED KINGFISHER', 'BIRD OF PARADISE', 'BLACK AND YELLOW BROADBILL', 'BLACK BAZA', 'BLACK BREASTED PUFFBIRD', 'BLACK COCKATO', 'BLACK FACED SPOONBILL', 'BLACK FRANCOLIN', 'BLACK HEADED CAIQUE', 'BLACK NECKED STILT', 'BLACK SKIMMER', 'BLACK SWAN', 'BLACK TAIL CRAKE', 'BLACK THROATED BUSHTIT', 'BLACK THROATED HUET', 'BLACK THROATED WARBLER', 'BLACK VENTED SHEARWATER', 'BLACK VULTURE', 'BLACK-CAPPED CHICKADEE', 'BLACK-NECKED GREBE', 'BLACK-THROATED SPARROW', 'BLACKBURNIAM WARBLER', 'BLONDE CRESTED WOODPECKER', 
#     'BLOOD PHEASANT', 'BLUE COAU', 'BLUE DACNIS', 'BLUE GRAY GNATCATCHER', 'BLUE GROSBEAK', 'BLUE GROUSE', 'BLUE HERON', 'BLUE MALKOHA', 'BLUE THROATED PIPING GUAN', 'BLUE THROATED TOUCANET', 'BOBOLINK', 'BORNEAN BRISTLEHEAD', 'BORNEAN LEAFBIRD', 'BORNEAN PHEASANT', 'BRANDT CORMARANT', 'BREWERS BLACKBIRD', 'BROWN CREPPER', 'BROWN HEADED COWBIRD', 'BROWN NOODY', 'BROWN THRASHER', 'BUFFLEHEAD', 'BULWERS PHEASANT', 'BURCHELLS COURSER', 'BUSH TURKEY', 'CAATINGA CACHOLOTE', 'CABOTS TRAGOPAN', 'CACTUS WREN', 'CALIFORNIA CONDOR', 'CALIFORNIA GULL', 'CALIFORNIA QUAIL', 'CAMPO FLICKER', 'CANARY', 'CANVASBACK', 'CAPE GLOSSY STARLING', 'CAPE LONGCLAW', 'CAPE MAY WARBLER', 'CAPE ROCK THRUSH', 'CAPPED HERON', 'CAPUCHINBIRD', 'CARMINE BEE-EATER', 'CASPIAN TERN', 'CASSOWARY', 'CEDAR WAXWING', 'CERULEAN WARBLER',
#     'CHARA DE COLLAR', 'CHATTERING LORY', 'CHESTNET BELLIED EUPHONIA', 'CHESTNUT WINGED CUCKOO', 'CHINESE BAMBOO PARTRIDGE', 'CHINESE POND HERON', 'CHIPPING SPARROW', 'CHUCAO TAPACULO', 'CHUKAR PARTRIDGE', 'CINNAMON ATTILA', 'CINNAMON FLYCATCHER', 'CINNAMON TEAL', 'CLARKS GREBE', 'CLARKS NUTCRACKER', 'COCK OF THE ROCK', 'COCKATOO', 'COLLARED ARACARI', 'COLLARED CRESCENTCHEST', 'COMMON FIRECREST', 'COMMON GRACKLE', 'COMMON HOUSE MARTIN', 'COMMON IORA', 'COMMON LOON',
#     'COMMON POORWILL', 'COMMON STARLING', 'COPPERSMITH BARBET', 'COPPERY TAILED COUCAL', 'CRAB PLOVER', 'CRANE HAWK', 'CREAM COLORED WOODPECKER', 'CRESTED AUKLET', 'CRESTED CARACARA', 'CRESTED COUA', 'CRESTED FIREBACK', 'CRESTED KINGFISHER', 'CRESTED NUTHATCH', 'CRESTED OROPENDOLA', 'CRESTED SERPENT EAGLE', 'CRESTED SHRIKETIT', 'CRESTED WOOD PARTRIDGE', 'CRIMSON CHAT', 'CRIMSON SUNBIRD', 'CROW', 'CUBAN TODY', 'CUBAN TROGON', 'CURL CRESTED ARACURI', 'D-ARNAUDS BARBET', 'DALMATIAN PELICAN', 'DARJEELING WOODPECKER', 'DARK EYED JUNCO', 'DAURIAN REDSTART', 'DEMOISELLE CRANE', 'DOUBLE BARRED FINCH', 'DOUBLE BRESTED CORMARANT', 'DOUBLE EYED FIG PARROT', 'DOWNY WOODPECKER', 'DUNLIN', 'DUSKY LORY', 'DUSKY ROBIN', 'EARED PITA', 'EASTERN BLUEBIRD', 'EASTERN BLUEBONNET', 'EASTERN GOLDEN WEAVER', 'EASTERN MEADOWLARK', 'EASTERN ROSELLA', 'EASTERN TOWEE', 'EASTERN WIP POOR WILL', 'EASTERN YELLOW ROBIN', 'ECUADORIAN HILLSTAR', 'EGYPTIAN GOOSE', 'ELEGANT TROGON', 'ELLIOTS PHEASANT', 'EMERALD TANAGER', 'EMPEROR PENGUIN', 'EMU', 'ENGGANO MYNA', 'EURASIAN BULLFINCH', 'EURASIAN GOLDEN ORIOLE', 'EURASIAN MAGPIE', 'EUROPEAN GOLDFINCH', 'EUROPEAN TURTLE DOVE', 'EVENING GROSBEAK', 'FAIRY BLUEBIRD', 'FAIRY PENGUIN', 'FAIRY TERN', 'FAN TAILED WIDOW', 'FASCIATED WREN', 'FIERY MINIVET', 'FIORDLAND PENGUIN', 'FIRE TAILLED MYZORNIS', 'FLAME BOWERBIRD', 'FLAME TANAGER', 'FOREST WAGTAIL', 'FRIGATE', 'FRILL BACK PIGEON', 'GAMBELS QUAIL', 'GANG GANG COCKATOO', 'GILA WOODPECKER', 'GILDED FLICKER', 'GLOSSY IBIS', 'GO AWAY BIRD', 'GOLD WING WARBLER', 'GOLDEN BOWER BIRD', 'GOLDEN CHEEKED WARBLER', 'GOLDEN CHLOROPHONIA',
#     'GOLDEN EAGLE', 'GOLDEN PARAKEET', 'GOLDEN PHEASANT', 'GOLDEN PIPIT', 'GOULDIAN FINCH', 'GRANDALA', 'GRAY CATBIRD', 'GRAY KINGBIRD', 'GRAY PARTRIDGE', 'GREAT ARGUS', 'GREAT GRAY OWL', 'GREAT JACAMAR', 'GREAT KISKADEE', 'GREAT POTOO', 'GREAT TINAMOU', 'GREAT XENOPS', 'GREATER PEWEE', 'GREATER PRAIRIE CHICKEN', 'GREATOR SAGE GROUSE', 'GREEN BROADBILL', 'GREEN JAY', 'GREEN MAGPIE', 'GREEN WINGED DOVE', 'GREY CUCKOOSHRIKE', 'GREY HEADED CHACHALACA', 'GREY HEADED FISH EAGLE', 'GREY PLOVER', 'GROVED BILLED ANI', 'GUINEA TURACO', 'GUINEAFOWL', 'GURNEYS PITTA', 'GYRFALCON', 'HAMERKOP', 'HARLEQUIN DUCK', 'HARLEQUIN QUAIL', 'HARPY EAGLE', 'HAWAIIAN GOOSE', 'HAWFINCH', 'HELMET VANGA', 'HEPATIC TANAGER', 'HIMALAYAN BLUETAIL', 'HIMALAYAN MONAL', 'HOATZIN', 'HOODED MERGANSER', 'HOOPOES', 'HORNED GUAN', 'HORNED LARK', 'HORNED SUNGEM', 'HOUSE FINCH', 'HOUSE SPARROW', 'HYACINTH MACAW', 'IBERIAN MAGPIE', 'IBISBILL', 'IMPERIAL SHAQ', 'INCA TERN', 'INDIAN BUSTARD', 'INDIAN PITTA', 'INDIAN ROLLER', 'INDIAN VULTURE', 'INDIGO BUNTING', 'INDIGO FLYCATCHER', 'INLAND DOTTEREL', 'IVORY BILLED ARACARI', 'IVORY GULL', 'IWI', 'JABIRU', 'JACK SNIPE', 'JACOBIN PIGEON', 'JANDAYA PARAKEET', 'JAPANESE ROBIN', 'JAVA SPARROW', 'JOCOTOCO ANTPITTA', 'KAGU', 'KAKAPO', 'KILLDEAR', 'KING EIDER', 'KING VULTURE', 'KIWI', 'KNOB BILLED DUCK', 'KOOKABURRA', 'LARK BUNTING', 'LAUGHING GULL', 'LAZULI BUNTING', 'LESSER ADJUTANT', 'LILAC ROLLER', 'LIMPKIN', 'LITTLE AUK', 'LOGGERHEAD SHRIKE', 'LONG-EARED OWL',
#     'LOONEY BIRDS', 'LUCIFER HUMMINGBIRD', 'MAGPIE GOOSE', 'MALABAR HORNBILL', 'MALACHITE KINGFISHER', 'MALAGASY WHITE EYE', 'MALEO', 'MALLARD DUCK', 'MANDRIN DUCK', 'MANGROVE CUCKOO', 'MARABOU STORK', 'MASKED BOBWHITE', 'MASKED BOOBY', 'MASKED LAPWING', 'MCKAYS BUNTING', 'MERLIN', 'MIKADO PHEASANT', 'MILITARY MACAW', 'MOURNING DOVE', 'MYNA', 'NICOBAR PIGEON', 'NOISY FRIARBIRD', 'NORTHERN BEARDLESS TYRANNULET', 'NORTHERN CARDINAL', 'NORTHERN FLICKER', 'NORTHERN FULMAR', 'NORTHERN GANNET', 'NORTHERN GOSHAWK', 'NORTHERN JACANA', 'NORTHERN MOCKINGBIRD', 'NORTHERN PARULA', 'NORTHERN RED BISHOP', 'NORTHERN SHOVELER', 'OCELLATED TURKEY', 'OILBIRD', 'OKINAWA RAIL', 'ORANGE BREASTED TROGON', 'ORANGE BRESTED BUNTING', 'ORIENTAL BAY OWL', 'ORNATE HAWK EAGLE', 'OSPREY', 'OSTRICH', 'OVENBIRD', 'OYSTER CATCHER', 'PAINTED BUNTING', 'PALILA', 'PALM NUT VULTURE', 'PARADISE TANAGER', 'PARAKETT AUKLET', 'PARUS MAJOR', 'PATAGONIAN SIERRA FINCH', 'PEACOCK', 
#     'PEREGRINE FALCON', 'PHAINOPEPLA', 'PHILIPPINE EAGLE', 'PINK ROBIN', 'PLUSH CRESTED JAY', 'POMARINE JAEGER', 'PUFFIN', 'PUNA TEAL', 'PURPLE FINCH', 'PURPLE GALLINULE', 'PURPLE MARTIN', 'PURPLE SWAMPHEN', 'PYGMY KINGFISHER', 'PYRRHULOXIA', 'QUETZAL', 'RAINBOW LORIKEET', 'RAZORBILL', 'RED BEARDED BEE EATER', 'RED BELLIED PITTA', 'RED BILLED TROPICBIRD', 'RED BROWED FINCH', 'RED CROSSBILL', 'RED FACED CORMORANT', 'RED FACED WARBLER', 'RED FODY', 'RED HEADED DUCK', 'RED HEADED WOODPECKER', 'RED KNOT', 'RED LEGGED HONEYCREEPER', 'RED NAPED TROGON', 'RED SHOULDERED HAWK', 'RED TAILED HAWK', 'RED TAILED THRUSH', 'RED WINGED BLACKBIRD', 'RED WISKERED BULBUL', 'REGENT BOWERBIRD', 'RING-NECKED PHEASANT', 'ROADRUNNER', 'ROCK DOVE', 'ROSE BREASTED COCKATOO', 'ROSE BREASTED GROSBEAK', 'ROSEATE SPOONBILL', 'ROSY FACED LOVEBIRD', 'ROUGH LEG BUZZARD', 'ROYAL FLYCATCHER', 'RUBY CROWNED KINGLET', 'RUBY THROATED HUMMINGBIRD', 
#     'RUDDY SHELDUCK', 'RUDY KINGFISHER', 'RUFOUS KINGFISHER', 'RUFOUS TREPE', 'RUFUOS MOTMOT', 'SAMATRAN THRUSH', 'SAND MARTIN', 'SANDHILL CRANE', 'SATYR TRAGOPAN', 'SAYS PHOEBE', 'SCARLET CROWNED FRUIT DOVE', 'SCARLET FACED LIOCICHLA', 'SCARLET IBIS', 'SCARLET MACAW', 'SCARLET TANAGER', 'SHOEBILL', 'SHORT BILLED DOWITCHER', 'SMITHS LONGSPUR', 'SNOW GOOSE', 'SNOW PARTRIDGE', 'SNOWY EGRET', 'SNOWY OWL', 'SNOWY PLOVER', 'SNOWY SHEATHBILL', 'SORA', 'SPANGLED COTINGA', 'SPLENDID WREN', 'SPOON BILED SANDPIPER', 'SPOTTED CATBIRD', 'SPOTTED WHISTLING DUCK', 'SQUACCO HERON', 'SRI LANKA BLUE MAGPIE', 'STEAMER DUCK', 'STORK BILLED KINGFISHER', 'STRIATED CARACARA', 'STRIPED OWL', 'STRIPPED MANAKIN', 'STRIPPED SWALLOW', 'SUNBITTERN', 'SUPERB STARLING', 'SURF SCOTER', 'SWINHOES PHEASANT', 'TAILORBIRD', 'TAIWAN MAGPIE', 'TAKAHE', 'TASMANIAN HEN', 'TAWNY FROGMOUTH', 'TEAL DUCK', 'TIT MOUSE', 'TOUCHAN', 'TOWNSENDS WARBLER', 'TREE SWALLOW', 'TRICOLORED BLACKBIRD', 'TROPICAL KINGBIRD', 'TRUMPTER SWAN', 'TURKEY VULTURE', 'TURQUOISE MOTMOT', 'UMBRELLA BIRD', 'VARIED THRUSH', 'VEERY', 'VENEZUELIAN TROUPIAL', 'VERDIN', 'VERMILION FLYCATHER', 'VICTORIA CROWNED PIGEON', 'VIOLET BACKED STARLING', 'VIOLET CUCKOO', 'VIOLET GREEN SWALLOW', 'VIOLET TURACO', 'VISAYAN HORNBILL', 'VULTURINE GUINEAFOWL', 'WALL CREAPER', 'WATTLED CURASSOW', 'WATTLED LAPWING', 'WHIMBREL', 'WHITE BREASTED WATERHEN', 'WHITE BROWED CRAKE', 'WHITE CHEEKED TURACO', 'WHITE CRESTED HORNBILL', 'WHITE EARED HUMMINGBIRD', 'WHITE NECKED RAVEN', 'WHITE TAILED TROPIC', 'WHITE THROATED BEE EATER', 'WILD TURKEY', 'WILLOW PTARMIGAN', 'WILSONS BIRD OF PARADISE', 'WOOD DUCK', 'WOOD THRUSH', 'WOODLAND KINGFISHER', 'WRENTIT', 'YELLOW BELLIED FLOWERPECKER', 'YELLOW BREASTED CHAT', 'YELLOW CACIQUE', 'YELLOW HEADED BLACKBIRD', 'ZEBRA DOVE'
# ]

birds = [
    'Abbott\'s_babbler',          # ABBOTTS BABBLER
    'Abbott\'s_booby',            # ABBOTTS BOOBY
    'Abyssinian_ground_hornbill', # ABYSSINIAN GROUND HORNBILL
    'African_crowned_crane',      # AFRICAN CROWNED CRANE
    'African_emerald_cuckoo',     # AFRICAN EMERALD CUCKOO
    'African_firefinch',          # AFRICAN FIREFINCH
    'African_oystercatcher',      # AFRICAN OYSTER CATCHER
    'African_pied_hornbill',      # AFRICAN PIED HORNBILL
    'African_pygmy_goose',        # AFRICAN PYGMY GOOSE
    'Albatross',                  # ALBATROSS
    'Albert\'s_towhee',           # ALBERTS TOWHEE
    'Alexandrine_parakeet',       # ALEXANDRINE PARAKEET
    'Alpine_chough',              # ALPINE CHOUGH
    'Altamira_yellowthroat',      # ALTAMIRA YELLOWTHROAT
    'American_avocet',            # AMERICAN AVOCET
    'American_bittern',           # AMERICAN BITTERN
    'American_coot',              # AMERICAN COOT
    'American_dipper',            # AMERICAN DIPPER
    'American_flamingo',          # AMERICAN FLAMINGO
    'American_goldfinch',         # AMERICAN GOLDFINCH
    'American_kestrel',           # AMERICAN KESTREL
    'American_pipit',             # AMERICAN PIPIT
    'American_redstart',          # AMERICAN REDSTART
    'American_robin',             # AMERICAN ROBIN
    'American_wigeon',            # AMERICAN WIGEON
    'Amethyst_woodstar',          # AMETHYST WOODSTAR
    'Andean_goose',               # ANDEAN GOOSE
    'Andean_lapwing',             # ANDEAN LAPWING
    'Andean_siskin',              # ANDEAN SISKIN
    'Anhinga',                    # ANHINGA
    'Anianiau',                   # ANIANIAU
    'Anna\'s_hummingbird',        # ANNAS HUMMINGBIRD
    'Antbird',                    # ANTBIRD
    'Antillean_euphonia',         # ANTILLEAN EUPHONIA
    'Apapane',                    # APAPANE
    'Apostlebird',                # APOSTLEBIRD
    'Araripe_manakin',            # ARARIPE MANAKIN
    'Ashy_storm_petrel',          # ASHY STORM PETREL
    'Ashy_thrush',            # ASHY THRUSHBIRD  ⚠️ uncertain — may not be a valid Wikipedia title
    'Asian_crested_ibis',         # ASIAN CRESTED IBIS
    'Asian_dollarbird',           # ASIAN DOLLARD BIRD (spelling fix)
    'Asian_green_bee-eater',      # ASIAN GREEN BEE EATER
    'Asian_openbill',             # ASIAN OPENBILL STORK
    'Auckland_shag',              # AUCKLAND SHAQ (spelling fix)
    'Austral_canastero',          # AUSTRAL CANASTERO
    'Australasian_figbird',       # AUSTRALASIAN FIGBIRD
    'Avadavat',                   # AVADAVAT
    'Azara\'s_spinetail',         # AZARAS SPINETAIL
    'Azure-breasted_pitta',       # AZURE BREASTED PITTA
    'Azure_jay',                  # AZURE JAY
    'Azure_tanager',              # AZURE TANAGER
    'Azure_tit',                  # AZURE TIT
    'Baikal_teal',                # BAIKAL TEAL
    'Bald_eagle',                 # BALD EAGLE
    'Northern_bald_ibis',         # BALD IBIS
    'Bali_myna',                  # BALI STARLING (Wikipedia title is Bali_myna)
    'Baltimore_oriole',           # BALTIMORE ORIOLE
    'Bananaquit',                 # BANANAQUIT
    'Band-tailed_guan',           # BAND TAILED GUAN
    'Banded_broadbill',           # BANDED BROADBILL
    'Banded_pitta',               # BANDED PITA (spelling fix)
    'Banded_stilt',               # BANDED STILT
    'Bar-tailed_godwit',          # BAR-TAILED GODWIT
    'Barn_owl',                   # BARN OWL
    'Barn_swallow',               # BARN SWALLOW
    'Barred_puffbird',            # BARRED PUFFBIRD
    'Barrow\'s_goldeneye',        # BARROWS GOLDENEYE
    'Bay-breasted_warbler',       # BAY-BREASTED WARBLER
    'Bearded_barbet',             # BEARDED BARBET
    'Bearded_bellbird',           # BEARDED BELLBIRD
    'Bearded_reedling',           # BEARDED REEDLING
    'Belted_kingfisher',          # BELTED KINGFISHER
    'Bird-of-paradise',           # BIRD OF PARADISE
    'Black-and-yellow_broadbill', # BLACK AND YELLOW BROADBILL
    'Black_baza',                 # BLACK BAZA
    'Black-breasted_puffbird',    # BLACK BREASTED PUFFBIRD
    'Black_cockatoo',             # BLACK COCKATO (spelling fix)
    'Black-faced_spoonbill',      # BLACK FACED SPOONBILL
    'Black_francolin',            # BLACK FRANCOLIN
    'Black-headed_caique',        # BLACK HEADED CAIQUE
    'Black-necked_stilt',         # BLACK NECKED STILT
    'Black_skimmer',              # BLACK SKIMMER
    'Black_swan',                 # BLACK SWAN
    'Black-tailed_crake',         # BLACK TAIL CRAKE
    'Black-throated_bushtit',     # BLACK THROATED BUSHTIT
    'Black-throated_huet-huet',   # BLACK THROATED HUET
    'Black-throated_warbler',     # BLACK THROATED WARBLER
    'Black-vented_shearwater',    # BLACK VENTED SHEARWATER
    'Black_vulture',              # BLACK VULTURE
    'Black-capped_chickadee',     # BLACK-CAPPED CHICKADEE
    'Black-necked_grebe',         # BLACK-NECKED GREBE
    'Black-throated_sparrow',     # BLACK-THROATED SPARROW
    'Blackburnian_warbler',       # BLACKBURNIAM WARBLER (spelling fix)
    'Blonde-crested_woodpecker',  # BLONDE CRESTED WOODPECKER
    'Blood_pheasant',             # BLOOD PHEASANT
    'Blue_coua',                  # BLUE COAU (spelling fix)
    'Blue_dacnis',                # BLUE DACNIS
    'Blue-gray_gnatcatcher',      # BLUE GRAY GNATCATCHER
    'Blue_grosbeak',              # BLUE GROSBEAK
    'Blue_grouse',                # BLUE GROUSE
    'Great_blue_heron',           # BLUE HERON
    'Blue_malkoha',               # BLUE MALKOHA
    'Blue-throated_piping_guan',  # BLUE THROATED PIPING GUAN
    'Blue-throated_toucanet',     # BLUE THROATED TOUCANET
    'Bobolink',                   # BOBOLINK
    'Bornean_bristlehead',        # BORNEAN BRISTLEHEAD
    'Bornean_leafbird',           # BORNEAN LEAFBIRD
    'Bornean_peacock-pheasant',   # BORNEAN PHEASANT
    'Brandt\'s_cormorant',        # BRANDT CORMARANT (spelling fix)
    'Brewer\'s_blackbird',        # BREWERS BLACKBIRD
    'Brown_creeper',              # BROWN CREPPER (spelling fix)
    'Brown-headed_cowbird',       # BROWN HEADED COWBIRD
    'Brown_noddy',                # BROWN NOODY (spelling fix)
    'Brown_thrasher',             # BROWN THRASHER
    'Bufflehead',                 # BUFFLEHEAD
    'Bulwer\'s_pheasant',         # BULWERS PHEASANT
    'Burchell\'s_courser',        # BURCHELLS COURSER
    'Australian_brushturkey',     # BUSH TURKEY
    'Caatinga_cacholote',         # CAATINGA CACHOLOTE
    'Cabot\'s_tragopan',          # CABOTS TRAGOPAN
    'Cactus_wren',                # CACTUS WREN
    'California_condor',          # CALIFORNIA CONDOR
    'California_gull',            # CALIFORNIA GULL
    'California_quail',           # CALIFORNIA QUAIL
    'Campo_flicker',              # CAMPO FLICKER
    'Atlantic_canary',            # CANARY
    'Canvasback',                 # CANVASBACK
    'Cape_starling',              # CAPE GLOSSY STARLING
    'Cape_longclaw',              # CAPE LONGCLAW
    'Cape_May_warbler',           # CAPE MAY WARBLER
    'Cape_rock_thrush',           # CAPE ROCK THRUSH
    'Capped_heron',               # CAPPED HERON
    'Capuchinbird',               # CAPUCHINBIRD
    'Southern_carmine_bee-eater', # CARMINE BEE-EATER
    'Caspian_tern',               # CASPIAN TERN
    'Southern_cassowary',         # CASSOWARY
    'Cedar_waxwing',              # CEDAR WAXWING
    'Cerulean_warbler',           # CERULEAN WARBLER
    'Tufted_jay',                 # CHARA DE COLLAR (Spanish name; Wikipedia title is Tufted_jay)
    'Chattering_lory',            # CHATTERING LORY
    'Chestnut-bellied_euphonia',  # CHESTNET BELLIED EUPHONIA (spelling fix)
    'Chestnut-winged_cuckoo',     # CHESTNUT WINGED CUCKOO
    'Chinese_bamboo_partridge',   # CHINESE BAMBOO PARTRIDGE
    'Chinese_pond_heron',         # CHINESE POND HERON
    'Chipping_sparrow',           # CHIPPING SPARROW
    'Chucao_tapaculo',            # CHUCAO TAPACULO
    'Chukar_partridge',           # CHUKAR PARTRIDGE
    'Cinnamon_attila',            # CINNAMON ATTILA
    'Cinnamon_flycatcher',        # CINNAMON FLYCATCHER
    'Cinnamon_teal',              # CINNAMON TEAL
    'Clark\'s_grebe',             # CLARKS GREBE
    'Clark\'s_nutcracker',        # CLARKS NUTCRACKER
    'Cock-of-the-rock',           # COCK OF THE ROCK
    'Cockatoo',                   # COCKATOO
    'Collared_aracari',           # COLLARED ARACARI
    'Collared_crescentchest',     # COLLARED CRESCENTCHEST
    'Common_firecrest',           # COMMON FIRECREST
    'Common_grackle',             # COMMON GRACKLE
    'Common_house_martin',        # COMMON HOUSE MARTIN
    'Common_iora',                # COMMON IORA
    'Common_loon',                # COMMON LOON
    'Common_poorwill',            # COMMON POORWILL
    'Common_starling',            # COMMON STARLING
    'Coppersmith_barbet',         # COPPERSMITH BARBET
    'Coppery-tailed_coucal',      # COPPERY TAILED COUCAL
    'Crab_plover',                # CRAB PLOVER
    'Crane_hawk',                 # CRANE HAWK
    'Cream-colored_woodpecker',   # CREAM COLORED WOODPECKER
    'Crested_auklet',             # CRESTED AUKLET
    'Crested_caracara',           # CRESTED CARACARA
    'Crested_coua',               # CRESTED COUA
    'Crested_fireback',           # CRESTED FIREBACK
    'Crested_kingfisher',         # CRESTED KINGFISHER
    'White-breasted_nuthatch',           # CRESTED NUTHATCH  ⚠️ uncertain — no standard species by this name
    'Crested_oropendola',         # CRESTED OROPENDOLA
    'Crested_serpent_eagle',      # CRESTED SERPENT EAGLE
    'Crested_shriketit',          # CRESTED SHRIKETIT
    'Crested_wood_partridge',     # CRESTED WOOD PARTRIDGE
    'Crimson_chat',               # CRIMSON CHAT
    'Crimson_sunbird',            # CRIMSON SUNBIRD
    'Crow',                       # CROW
    'Cuban_tody',                 # CUBAN TODY
    'Cuban_trogon',               # CUBAN TROGON
    'Curl-crested_aracari',       # CURL CRESTED ARACURI (spelling fix)
    'D\'Arnaud\'s_barbet',        # D-ARNAUDS BARBET
    'Dalmatian_pelican',          # DALMATIAN PELICAN
    'Darjeeling_woodpecker',      # DARJEELING WOODPECKER
    'Dark-eyed_junco',            # DARK EYED JUNCO
    'Daurian_redstart',           # DAURIAN REDSTART
    'Demoiselle_crane',           # DEMOISELLE CRANE
    'Double-barred_finch',        # DOUBLE BARRED FINCH
    'Double-crested_cormorant',   # DOUBLE BRESTED CORMARANT (spelling fix)
    'Double-eyed_fig_parrot',     # DOUBLE EYED FIG PARROT
    'Downy_woodpecker',           # DOWNY WOODPECKER
    'Dunlin',                     # DUNLIN
    'Dusky_lory',                 # DUSKY LORY
    'Dusky_robin',                # DUSKY ROBIN
    'Eared_pitta',                # EARED PITA (spelling fix)
    'Eastern_bluebird',           # EASTERN BLUEBIRD
    'Eastern_bluebonnet',         # EASTERN BLUEBONNET
    'Eastern_golden_weaver',      # EASTERN GOLDEN WEAVER
    'Eastern_meadowlark',         # EASTERN MEADOWLARK
    'Eastern_rosella',            # EASTERN ROSELLA
    'Eastern_towhee',             # EASTERN TOWEE (spelling fix)
    'Eastern_whip-poor-will',     # EASTERN WIP POOR WILL
    'Eastern_yellow_robin',       # EASTERN YELLOW ROBIN
    'Ecuadorian_hillstar',        # ECUADORIAN HILLSTAR
    'Egyptian_goose',             # EGYPTIAN GOOSE
    'Elegant_trogon',             # ELEGANT TROGON
    'Elliot\'s_pheasant',         # ELLIOTS PHEASANT
    'Emerald_tanager',            # EMERALD TANAGER
    'Emperor_penguin',            # EMPEROR PENGUIN
    'Emu',                        # EMU
    'Enggano_myna',               # ENGGANO MYNA
    'Eurasian_bullfinch',         # EURASIAN BULLFINCH
    'Eurasian_golden_oriole',     # EURASIAN GOLDEN ORIOLE
    'Eurasian_magpie',            # EURASIAN MAGPIE
    'European_goldfinch',         # EUROPEAN GOLDFINCH
    'European_turtle_dove',       # EUROPEAN TURTLE DOVE
    'Evening_grosbeak',           # EVENING GROSBEAK
    'Asian_fairy-bluebird',       # FAIRY BLUEBIRD
    'Little_penguin',             # FAIRY PENGUIN (Wikipedia title is Little_penguin)
    'White_tern',                 # FAIRY TERN (Wikipedia title is White_tern)
    'Fan-tailed_widowbird',       # FAN TAILED WIDOW
    'Fasciated_wren',             # FASCIATED WREN
    'Fiery_minivet',              # FIERY MINIVET
    'Fiordland_penguin',          # FIORDLAND PENGUIN
    'Fire-tailed_myzornis',       # FIRE TAILLED MYZORNIS (spelling fix)
    'Flame_bowerbird',            # FLAME BOWERBIRD
    'Flame-colored_tanager',      # FLAME TANAGER
    'Forest_wagtail',             # FOREST WAGTAIL
    'Frigatebird',                # FRIGATE
    'Frillback_pigeon',           # FRILL BACK PIGEON
    'Gambel\'s_quail',            # GAMBELS QUAIL
    'Gang-gang_cockatoo',         # GANG GANG COCKATOO
    'Gila_woodpecker',            # GILA WOODPECKER
    'Gilded_flicker',             # GILDED FLICKER
    'Glossy_ibis',                # GLOSSY IBIS
    'Go-away_bird',               # GO AWAY BIRD
    'Golden-winged_warbler',      # GOLD WING WARBLER
    'Golden_bowerbird',           # GOLDEN BOWER BIRD
    'Golden-cheeked_warbler',     # GOLDEN CHEEKED WARBLER
    'Golden_chlorophonia',        # GOLDEN CHLOROPHONIA
    'Golden_eagle',               # GOLDEN EAGLE
    'Golden_parakeet',            # GOLDEN PARAKEET
    'Golden_pheasant',            # GOLDEN PHEASANT
    'Golden_pipit',               # GOLDEN PIPIT
    'Gouldian_finch',             # GOULDIAN FINCH
    'Grandala',                   # GRANDALA
    'Gray_catbird',               # GRAY CATBIRD
    'Gray_kingbird',              # GRAY KINGBIRD
    'Grey_partridge',             # GRAY PARTRIDGE (Wikipedia uses British spelling)
    'Great_argus',                # GREAT ARGUS
    'Great_grey_owl',             # GREAT GRAY OWL (Wikipedia uses British spelling)
    'Great_jacamar',              # GREAT JACAMAR
    'Great_kiskadee',             # GREAT KISKADEE
    'Great_potoo',                # GREAT POTOO
    'Great_tinamou',              # GREAT TINAMOU
    'Great_xenops',               # GREAT XENOPS
    'Greater_pewee',              # GREATER PEWEE
    'Greater_prairie_chicken',    # GREATER PRAIRIE CHICKEN
    'Greater_sage-grouse',        # GREATOR SAGE GROUSE (spelling fix)
    'Green_broadbill',            # GREEN BROADBILL
    'Green_jay',                  # GREEN JAY
    'Common_green_magpie',        # GREEN MAGPIE
    'Green-winged_dove',          # GREEN WINGED DOVE
    'Grey_cuckooshrike',          # GREY CUCKOOSHRIKE
    'Grey-headed_chachalaca',     # GREY HEADED CHACHALACA
    'Grey-headed_fish_eagle',     # GREY HEADED FISH EAGLE
    'Grey_plover',                # GREY PLOVER
    'Groove-billed_ani',          # GROVED BILLED ANI (spelling fix)
    'Guinea_turaco',              # GUINEA TURACO
    'Helmeted_guineafowl',        # GUINEAFOWL
    'Gurney\'s_pitta',            # GURNEYS PITTA
    'Gyrfalcon',                  # GYRFALCON
    'Hamerkop',                   # HAMERKOP
    'Harlequin_duck',             # HARLEQUIN DUCK
    'Harlequin_quail',            # HARLEQUIN QUAIL
    'Harpy_eagle',                # HARPY EAGLE
    'Hawaiian_goose',             # HAWAIIAN GOOSE
    'Hawfinch',                   # HAWFINCH
    'Helmet_vanga',               # HELMET VANGA
    'Hepatic_tanager',            # HEPATIC TANAGER
    'Himalayan_bluetail',         # HIMALAYAN BLUETAIL
    'Himalayan_monal',            # HIMALAYAN MONAL
    'Hoatzin',                    # HOATZIN
    'Hooded_merganser',           # HOODED MERGANSER
    'Hoopoe',                     # HOOPOES
    'Horned_guan',                # HORNED GUAN
    'Horned_lark',                # HORNED LARK
    'Horned_sungem',              # HORNED SUNGEM
    'House_finch',                # HOUSE FINCH
    'House_sparrow',              # HOUSE SPARROW
    'Hyacinth_macaw',             # HYACINTH MACAW
    'Iberian_magpie',             # IBERIAN MAGPIE
    'Ibisbill',                   # IBISBILL
    'Imperial_shag',              # IMPERIAL SHAQ (spelling fix)
    'Inca_tern',                  # INCA TERN
    'Great_Indian_bustard',       # INDIAN BUSTARD
    'Indian_pitta',               # INDIAN PITTA
    'Indian_roller',              # INDIAN ROLLER
    'Indian_vulture',             # INDIAN VULTURE
    'Indigo_bunting',             # INDIGO BUNTING
    'Indigo_flycatcher',          # INDIGO FLYCATCHER
    'Inland_dotterel',            # INLAND DOTTEREL
    'Ivory-billed_aracari',       # IVORY BILLED ARACARI
    'Ivory_gull',                 # IVORY GULL
    'ʻIʻiwi',                     # IWI (special characters; URL-encode as needed)
    'Jabiru',                     # JABIRU
    'Jack_snipe',                 # JACK SNIPE
    'Jacobin_pigeon',             # JACOBIN PIGEON
    'Jandaya_parakeet',           # JANDAYA PARAKEET
    'Japanese_robin',             # JAPANESE ROBIN
    'Java_sparrow',               # JAVA SPARROW
    'Jocotoco_antpitta',          # JOCOTOCO ANTPITTA
    'Kagu',                       # KAGU
    'Kākāpō',                     # KAKAPO (special characters; URL-encode as needed)
    'Killdeer',                   # KILLDEAR (spelling fix)
    'King_eider',                 # KING EIDER
    'King_vulture',               # KING VULTURE
    'Kiwi',                       # KIWI
    'Knob-billed_duck',           # KNOB BILLED DUCK
    'Laughing_kookaburra',        # KOOKABURRA
    'Lark_bunting',               # LARK BUNTING
    'Laughing_gull',              # LAUGHING GULL
    'Lazuli_bunting',             # LAZULI BUNTING
    'Lesser_adjutant',            # LESSER ADJUTANT
    'Lilac-breasted_roller',      # LILAC ROLLER
    'Limpkin',                    # LIMPKIN
    'Little_auk',                 # LITTLE AUK
    'Loggerhead_shrike',          # LOGGERHEAD SHRIKE
    'Long-eared_owl',             # LONG-EARED OWL
    'Common_loon',               # LOONEY BIRDS  ⚠️ not a real species — no Wikipedia page
    'Lucifer_hummingbird',        # LUCIFER HUMMINGBIRD
    'Magpie_goose',               # MAGPIE GOOSE
    'Malabar_pied_hornbill',      # MALABAR HORNBILL
    'Malachite_kingfisher',       # MALACHITE KINGFISHER
    'Malagasy_white-eye',         # MALAGASY WHITE EYE
    'Maleo',                      # MALEO
    'Mallard',                    # MALLARD DUCK
    'Mandarin_duck',              # MANDRIN DUCK (spelling fix)
    'Mangrove_cuckoo',            # MANGROVE CUCKOO
    'Marabou_stork',              # MARABOU STORK
    'Masked_bobwhite',            # MASKED BOBWHITE
    'Masked_booby',               # MASKED BOOBY
    'Masked_lapwing',             # MASKED LAPWING
    'McKay\'s_bunting',           # MCKAYS BUNTING
    'Merlin_(bird)',              # MERLIN (disambiguated)
    'Mikado_pheasant',            # MIKADO PHEASANT
    'Military_macaw',             # MILITARY MACAW
    'Mourning_dove',              # MOURNING DOVE
    'Common_myna',                # MYNA
    'Nicobar_pigeon',             # NICOBAR PIGEON
    'Noisy_friarbird',            # NOISY FRIARBIRD
    'Northern_beardless_tyrannulet', # NORTHERN BEARDLESS TYRANNULET
    'Northern_cardinal',          # NORTHERN CARDINAL
    'Northern_flicker',           # NORTHERN FLICKER
    'Northern_fulmar',            # NORTHERN FULMAR
    'Northern_gannet',            # NORTHERN GANNET
    'Northern_goshawk',           # NORTHERN GOSHAWK
    'Northern_jacana',            # NORTHERN JACANA
    'Northern_mockingbird',       # NORTHERN MOCKINGBIRD
    'Northern_parula',            # NORTHERN PARULA
    'Northern_red_bishop',        # NORTHERN RED BISHOP
    'Northern_shoveler',          # NORTHERN SHOVELER
    'Ocellated_turkey',           # OCELLATED TURKEY
    'Oilbird',                    # OILBIRD
    'Okinawa_rail',               # OKINAWA RAIL
    'Orange-breasted_trogon',     # ORANGE BREASTED TROGON
    'Orange-breasted_bunting',    # ORANGE BRESTED BUNTING (spelling fix)
    'Oriental_bay_owl',           # ORIENTAL BAY OWL
    'Ornate_hawk-eagle',          # ORNATE HAWK EAGLE
    'Osprey',                     # OSPREY
    'Ostrich',                    # OSTRICH
    'Ovenbird',                   # OVENBIRD
    'Oystercatcher',              # OYSTER CATCHER
    'Painted_bunting',            # PAINTED BUNTING
    'Palila',                     # PALILA
    'Palm-nut_vulture',           # PALM NUT VULTURE
    'Paradise_tanager',           # PARADISE TANAGER
    'Parakeet_auklet',            # PARAKETT AUKLET (spelling fix)
    'Parus_major',                # PARUS MAJOR
    'Patagonian_sierra_finch',    # PATAGONIAN SIERRA FINCH
    'Indian_peafowl',             # PEACOCK
    'Peregrine_falcon',           # PEREGRINE FALCON
    'Phainopepla',                # PHAINOPEPLA
    'Philippine_eagle',           # PHILIPPINE EAGLE
    'Pink_robin',                 # PINK ROBIN
    'Plush-crested_jay',          # PLUSH CRESTED JAY
    'Pomarine_jaeger',            # POMARINE JAEGER
    'Atlantic_puffin',            # PUFFIN
    'Puna_teal',                  # PUNA TEAL
    'Purple_finch',               # PURPLE FINCH
    'Purple_gallinule',           # PURPLE GALLINULE
    'Purple_martin',              # PURPLE MARTIN
    'Purple_swamphen',            # PURPLE SWAMPHEN
    'African_pygmy_kingfisher',   # PYGMY KINGFISHER
    'Pyrrhuloxia',                # PYRRHULOXIA
    'Resplendent_quetzal',        # QUETZAL
    'Rainbow_lorikeet',           # RAINBOW LORIKEET
    'Razorbill',                  # RAZORBILL
    'Red-bearded_bee-eater',      # RED BEARDED BEE EATER
    'Red-bellied_pitta',          # RED BELLIED PITTA
    'Red-billed_tropicbird',      # RED BILLED TROPICBIRD
    'Red-browed_finch',           # RED BROWED FINCH
    'Red_crossbill',              # RED CROSSBILL
    'Red-faced_cormorant',        # RED FACED CORMORANT
    'Red-faced_warbler',          # RED FACED WARBLER
    'Red_fody',                   # RED FODY
    'Red-headed_duck',            # RED HEADED DUCK
    'Red-headed_woodpecker',      # RED HEADED WOODPECKER
    'Red_knot',                   # RED KNOT
    'Red-legged_honeycreeper',    # RED LEGGED HONEYCREEPER
    'Red-naped_trogon',           # RED NAPED TROGON
    'Red-shouldered_hawk',        # RED SHOULDERED HAWK
    'Red-tailed_hawk',            # RED TAILED HAWK
    'Red-tailed_thrush',          # RED TAILED THRUSH
    'Red-winged_blackbird',       # RED WINGED BLACKBIRD
    'Red-whiskered_bulbul',       # RED WISKERED BULBUL (spelling fix)
    'Regent_bowerbird',           # REGENT BOWERBIRD
    'Ring-necked_pheasant',       # RING-NECKED PHEASANT
    'Greater_roadrunner',         # ROADRUNNER
    'Rock_dove',                  # ROCK DOVE
    'Galah',                      # ROSE BREASTED COCKATOO (Wikipedia title is Galah)
    'Rose-breasted_grosbeak',     # ROSE BREASTED GROSBEAK
    'Roseate_spoonbill',          # ROSEATE SPOONBILL
    'Rosy-faced_lovebird',        # ROSY FACED LOVEBIRD
    'Rough-legged_buzzard',       # ROUGH LEG BUZZARD
    'Royal_flycatcher',           # ROYAL FLYCATCHER
    'Ruby-crowned_kinglet',       # RUBY CROWNED KINGLET
    'Ruby-throated_hummingbird',  # RUBY THROATED HUMMINGBIRD
    'Ruddy_shelduck',             # RUDDY SHELDUCK
    'Ruddy_kingfisher',           # RUDY KINGFISHER (spelling fix)
    'Rufous_kingfisher',          # RUFOUS KINGFISHER
    'Rufous_treepie',             # RUFOUS TREPE (spelling fix)
    'Rufous_motmot',              # RUFUOS MOTMOT (spelling fix)
    'Sumatran_thrush',            # SAMATRAN THRUSH (spelling fix)
    'Sand_martin',                # SAND MARTIN
    'Sandhill_crane',             # SANDHILL CRANE
    'Satyr_tragopan',             # SATYR TRAGOPAN
    'Say\'s_phoebe',              # SAYS PHOEBE
    'Henderson_fruit_dove',  # SCARLET CROWNED FRUIT DOVE  ⚠️ verify exact Wikipedia title
    'Scarlet-faced_liocichla',    # SCARLET FACED LIOCICHLA
    'Scarlet_ibis',               # SCARLET IBIS
    'Scarlet_macaw',              # SCARLET MACAW
    'Scarlet_tanager',            # SCARLET TANAGER
    'Shoebill',                   # SHOEBILL
    'Short-billed_dowitcher',     # SHORT BILLED DOWITCHER
    'Smith\'s_longspur',          # SMITHS LONGSPUR
    'Snow_goose',                 # SNOW GOOSE
    'Snow_partridge',             # SNOW PARTRIDGE
    'Snowy_egret',                # SNOWY EGRET
    'Snowy_owl',                  # SNOWY OWL
    'Snowy_plover',               # SNOWY PLOVER
    'Snowy_sheathbill',           # SNOWY SHEATHBILL
    'Sora_(bird)',                # SORA
    'Spangled_cotinga',           # SPANGLED COTINGA
    'Splendid_fairywren',         # SPLENDID WREN
    'Spoon-billed_sandpiper',     # SPOON BILED SANDPIPER (spelling fix)
    'Spotted_catbird',            # SPOTTED CATBIRD
    'Spotted_whistling_duck',     # SPOTTED WHISTLING DUCK
    'Squacco_heron',              # SQUACCO HERON
    'Sri_Lanka_blue_magpie',      # SRI LANKA BLUE MAGPIE
    'Steamer_duck',               # STEAMER DUCK
    'Stork-billed_kingfisher',    # STORK BILLED KINGFISHER
    'Striated_caracara',          # STRIATED CARACARA
    'Striped_owl',                # STRIPED OWL
    'Striped_manakin',            # STRIPPED MANAKIN (spelling fix)
    'Striped_swallow',            # STRIPPED SWALLOW (spelling fix)
    'Sunbittern',                 # SUNBITTERN
    'Superb_starling',            # SUPERB STARLING
    'Surf_scoter',                # SURF SCOTER
    'Swinhoe\'s_pheasant',        # SWINHOES PHEASANT
    'Common_tailorbird',          # TAILORBIRD
    'Taiwan_blue_magpie',         # TAIWAN MAGPIE
    'Takahē',                     # TAKAHE (special characters; URL-encode as needed)
    'Tasmanian_nativehen',        # TASMANIAN HEN
    'Tawny_frogmouth',            # TAWNY FROGMOUTH
    'Teal_(bird)',                # TEAL DUCK (too generic; disambiguated)
    'Tufted_titmouse',            # TIT MOUSE
    'Toucan',                     # TOUCHAN (spelling fix)
    'Townsend\'s_warbler',        # TOWNSENDS WARBLER
    'Tree_swallow',               # TREE SWALLOW
    'Tricolored_blackbird',       # TRICOLORED BLACKBIRD
    'Tropical_kingbird',          # TROPICAL KINGBIRD
    'Trumpeter_swan',             # TRUMPTER SWAN (spelling fix)
    'Turkey_vulture',             # TURKEY VULTURE
    'Turquoise-browed_motmot',    # TURQUOISE MOTMOT
    'Umbrellabird',               # UMBRELLA BIRD
    'Varied_thrush',              # VARIED THRUSH
    'Veery',                      # VEERY
    'Venezuelan_troupial',        # VENEZUELIAN TROUPIAL (spelling fix)
    'Verdin',                     # VERDIN
    'Vermilion_flycatcher',       # VERMILION FLYCATHER (spelling fix)
    'Victoria_crowned_pigeon',    # VICTORIA CROWNED PIGEON
    'Violet-backed_starling',     # VIOLET BACKED STARLING
    'Violet_cuckoo',              # VIOLET CUCKOO
    'Violet-green_swallow',       # VIOLET GREEN SWALLOW
    'Violet_turaco',              # VIOLET TURACO
    'Visayan_hornbill',           # VISAYAN HORNBILL
    'Vulturine_guineafowl',       # VULTURINE GUINEAFOWL
    'Wallcreeper',                # WALL CREAPER (spelling fix)
    'Wattled_curassow',           # WATTLED CURASSOW
    'Wattled_lapwing',            # WATTLED LAPWING
    'Whimbrel',                   # WHIMBREL
    'White-breasted_waterhen',    # WHITE BREASTED WATERHEN
    'White-browed_crake',         # WHITE BROWED CRAKE
    'White-cheeked_turaco',       # WHITE CHEEKED TURACO
    'White-crested_hornbill',     # WHITE CRESTED HORNBILL
    'White-eared_hummingbird',    # WHITE EARED HUMMINGBIRD
    'White-necked_raven',         # WHITE NECKED RAVEN
    'White-tailed_tropicbird',    # WHITE TAILED TROPIC
    'White-throated_bee-eater',   # WHITE THROATED BEE EATER
    'Wild_turkey',                # WILD TURKEY
    'Willow_ptarmigan',           # WILLOW PTARMIGAN
    'Wilson\'s_bird-of-paradise', # WILSONS BIRD OF PARADISE
    'Wood_duck',                  # WOOD DUCK
    'Wood_thrush',                # WOOD THRUSH
    'Woodland_kingfisher',        # WOODLAND KINGFISHER
    'Wrentit',                    # WRENTIT
    'Yellow-bellied_flowerpecker',# YELLOW BELLIED FLOWERPECKER
    'Yellow-breasted_chat',       # YELLOW BREASTED CHAT
    'Yellow_cacique',             # YELLOW CACIQUE
    'Yellow-headed_blackbird',    # YELLOW HEADED BLACKBIRD
    'Zebra_dove',                 # ZEBRA DOVE
]
 
# ── Notes on flagged / non-obvious conversions ──────────────────────────────
# ⚠️  ASHY THRUSHBIRD      → 'Ashy_thrushbird'          — uncertain; verify
# ⚠️  CRESTED NUTHATCH     → 'Crested_nuthatch'          — no standard species; verify
# ⚠️  LOONEY BIRDS         → 'Looney_birds'              — not a real species; no Wikipedia page
# ⚠️  SCARLET CROWNED FRUIT DOVE → 'Scarlet-capped_fruit_dove' — verify exact title
#
# ── Wikipedia title differs from common name ────────────────────────────────
# BALI STARLING           → Bali_myna
# BALD IBIS               → Northern_bald_ibis
# BUSH TURKEY             → Australian_brushturkey
# CANARY                  → Atlantic_canary
# CARMINE BEE-EATER       → Southern_carmine_bee-eater
# CASSOWARY               → Southern_cassowary
# CHARA DE COLLAR         → Tufted_jay  (Spanish common name)
# COCK OF THE ROCK        → Cock-of-the-rock
# FAIRY BLUEBIRD          → Asian_fairy-bluebird
# FAIRY PENGUIN           → Little_penguin
# FAIRY TERN              → White_tern
# FRIGATE                 → Frigatebird
# GO AWAY BIRD            → Go-away_bird
# GOLD WING WARBLER       → Golden-winged_warbler
# GRAY PARTRIDGE          → Grey_partridge  (British spelling on Wikipedia)
# GREAT GRAY OWL          → Great_grey_owl  (British spelling on Wikipedia)
# GREEN MAGPIE            → Common_green_magpie
# GUINEAFOWL              → Helmeted_guineafowl
# HOOPOES                 → Hoopoe
# INDIAN BUSTARD          → Great_Indian_bustard
# IWI                     → ʻIʻiwi  (requires URL encoding)
# KAKAPO                  → Kākāpō  (requires URL encoding)
# KOOKABURRA              → Laughing_kookaburra
# LILAC ROLLER            → Lilac-breasted_roller
# MALABAR HORNBILL        → Malabar_pied_hornbill
# MALLARD DUCK            → Mallard
# MERLIN                  → Merlin_(bird)  (disambiguated)
# MYNA                    → Common_myna
# PEACOCK                 → Indian_peafowl
# PUFFIN                  → Atlantic_puffin
# PYGMY KINGFISHER        → African_pygmy_kingfisher
# QUETZAL                 → Resplendent_quetzal
# ROADRUNNER              → Greater_roadrunner
# ROSE BREASTED COCKATOO  → Galah
# SORA                    → Sora_(bird)  (disambiguated)
# TAILORBIRD              → Common_tailorbird
# TAIWAN MAGPIE           → Taiwan_blue_magpie
# TAKAHE                  → Takahē  (requires URL encoding)
# TASMANIAN HEN           → Tasmanian_nativehen
# TEAL DUCK               → Teal_(bird)  (disambiguated)
# TIT MOUSE               → Tufted_titmouse
# TOUCHAN                 → Toucan
# TURQUOISE MOTMOT        → Turquoise-browed_motmot
# UMBRELLA BIRD           → Umbrellabird
# WALL CREAPER            → Wallcreeper
# WHITE TAILED TROPIC     → White-tailed_tropicbird


# gets summary of bird page
def get_summary(bird: str):
    response = requests.get(
        "https://en.wikipedia.org/w/api.php",
        headers={"User-Agent": "BirdWatch/1.0"},    # change this guy
        params={
            "action": "query",
            "prop": "extracts",
            "exintro": True,
            "explaintext": True,
            "titles": f'{bird}',
            "format": "json"
        }
    )
    data = response.json()
    pages = data["query"]["pages"]
    page = next(iter(pages.values()))
    return page["extract"]

# gets bird image
def get_bird_image(page_title):
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": page_title,
        "prop": "images",
        "imlimit": "50",
        "format": "json"
    }
    headers={"User-Agent": "BirdWatch/1.0 (creativeaidan@gmail.com)"}
    
    response = requests.get(url, params=params, headers=headers).json()
    page = next(iter(response["query"]["pages"].values()))
    
    other_imgs = [img["title"] for img in page.get("images", []) \
                  if img["title"].endswith(".png") or
                  img["title"].endswith('.jpg') or
                  img["title"].endswith('.jpeg') or
                  img["title"].endswith('.gif')
                ]
    
    if(len(other_imgs) > 10):
        other_imgs = other_imgs[:10]

    img = other_imgs[0]
    # get the actual file URL
    file_params = {
        "action": "query",
        "titles": img,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json"
    }
    file_response = requests.get(url, params=file_params, headers=headers).json()
    file_page = next(iter(file_response["query"]["pages"].values()))

    img_url = file_page["imageinfo"][0]["url"]
    response = requests.get(img_url, headers=headers)
    img_contents = response.content  # raw bytes
    extension = '.' + img_url.split(".")[-1]

    return [img_contents, extension]

# gets distribution map. returns raw image contents
def get_map(page_title):
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": page_title,
        "prop": "images",
        "imlimit": "50",
        "format": "json"
    }
    headers={"User-Agent": "BirdWatch/1.0 (creativeaidan@gmail.com)"}
    
    response = requests.get(url, params=params, headers=headers).json()
    page = next(iter(response["query"]["pages"].values()))
    
    # filter to only SVG files
    svgs = [img["title"] for img in page.get("images", []) if img["title"].endswith(".svg")]

    other_imgs = [img["title"] for img in page.get("images", []) \
                  if img["title"].endswith(".png") or
                  img["title"].endswith('.jpg') or
                  img["title"].endswith('.jpeg') or
                  img["title"].endswith('.gif')
                ]
    
    # limit search to 5 svgs / images
    if(len(svgs) > 10):
        svgs = svgs[:10]

    if(len(other_imgs) > 10):
        other_imgs = other_imgs[:10]

    best_img = None
    best_url = None
    best_score = 0

    for svg in svgs:
        # get the actual file URL
        file_params = {
            "action": "query",
            "titles": svg,
            "prop": "imageinfo",
            "iiprop": "url",
            "format": "json"
        }
        file_response = requests.get(url, params=file_params, headers=headers).json()
        file_page = next(iter(file_response["query"]["pages"].values()))

        svg_url = file_page["imageinfo"][0]["url"]
        response = requests.get(svg_url, headers=headers)
        svg_contents = response.content  # raw bytes

        validity_result = is_valid_map_svg(svg_contents, svg_url, page_title)
        if validity_result == 10:
            print(svg_url)
            extension = '.' + svg_url.split(".")[-1]
            return [svg_contents, extension]
        elif validity_result > best_score:
            best_score = validity_result
            best_img = svg_contents
            best_url = svg_url

    for img in other_imgs:
        # get the actual file URL
        file_params = {
            "action": "query",
            "titles": img,
            "prop": "imageinfo",
            "iiprop": "url",
            "format": "json"
        }
        file_response = requests.get(url, params=file_params, headers=headers).json()
        file_page = next(iter(file_response["query"]["pages"].values()))

        img_url = file_page["imageinfo"][0]["url"]
        response = requests.get(img_url, headers=headers)
        img_contents = response.content  # raw bytes

        validity_result = is_valid_map_img(img_contents, img_url, page_title)
        if validity_result == 10:
            print(img_url)
            extension = '.' + img_url.split(".")[-1]
            return [img_contents, extension]
        elif validity_result > best_score:
            best_score = validity_result
            best_img = img_contents
            best_url = img_url

    if best_img == None:
        return None
    else:
        print(best_url)
        extension = '.' + best_url.split(".")[-1]
        return [best_img, extension]

def is_valid_map_svg(svg_contents, svg_url, page_title):
    # try to validate by svg name first
    name = svg_url.lower()
    if 'map' in name:
        return 10
    if 'range' in name:
        return 10
    if 'area' in name:
        return 10
    if 'dist' in name:
        return 10

    # filter out any logos or icons
    if 'logo' in name:
        return 0
    if 'icon' in name:
        return 0
    if 'cscr' in name:
        return 0
    
    svg = SVG.parse(BytesIO(svg_contents))

    # filter out status marker
    if svg.width and svg.height and svg.width / svg.height > 2.5:
        return 0
    # filer out small svgs
    if svg.width and svg.height:
        if not (svg.width >= 250 and svg.height >= 250):
            return 0

    # rank now by metrics
    score = 0
    
    if 'iucn' in name:
        score += 1
    
    suffix = page_title.lower()[-4:]
    if suffix in name:
        score += 2

    return score

def is_valid_map_img(img_contents, img_url, page_title):
    name = img_url.lower()
    if 'map' in name:
        return 10
    if 'range' in name:
        return 10
    if 'area' in name:
        return 10
    if 'dist' in name:
        return 10
    
    score = 0
    
    return score

def transform_bird_name(raw_bird: str):
    bird_title = raw_bird.capitalize()
    bird_title = bird_title.replace(" ", "_")
    #bird_title = bird_title.replace("s_", "%27s_")
    return bird_title

# tests for above functions
def main():
    pass

if __name__ == '__main__':
    get_map('Harpy_eagle')