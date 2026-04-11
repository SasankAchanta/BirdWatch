import React from "react";
import { Image, View, Text, Pressable } from 'react-native';
import Style from './Style.js';
import Read from './Read.jsx';

import { useRouter, usePathname } from 'expo-router';

import americanGoldfinch from './birdpics/american goldfinch.png';
import AGmap from './birdpics/area.png';
import AGPop from './birdpics/status.png';

import CBE from './birdpics/carmine bee eater.png';





//blank page
function ReadMore(){
    const router = useRouter();
    const pathname = usePathname();

  

    return(
    <View style={{flex:1}}>
        <Read
            BirdPic={americanGoldfinch}
            PopuationPic={AGPop}
            Info={"The American goldfinch (Spinus tristis) is a small North American bird in the finch family. It is migratory, ranging from mid-Alberta to North Carolina during the breeding season, and from just south of the Canada-United States border to Mexico during the winter. The only finch in its subfamily to undergo a complete molt, the American goldfinch displays sexual dichromatism: the male is a vibrant yellow in the summer and an olive color during the winter, while the female is a dull yellow-brown shade  which brightens only slightly during the summer. The male displays  brightly colored plumage during the breeding season to attract a mate. The American goldfinch is a granivore and adapted for the consumption of seedheads, with a conical beak to remove the seeds and agile feet to grip the stems of seedheads while feeding. It is a social bird and will gather in large flocks while  feeding and migrating. It may behave territorially during nest construction, but this aggression is short-lived. Its  breeding season is tied to the peak of food supply, beginning in late  July, which is relatively late in the year for a finch. This species is  generally monogamous and produces one brood each year. Human activity has generally benefited the American goldfinch. It is often found in residential areas because it is attracted to bird feeders, which increase its survival rate in these areas. Deforestation also creates open meadow areas, which are its preferred habitat. READ MORE ON WIKIPEDIA"}
            Map={AGmap}
            Birdname={"American Goldfinch"}
            Facts={"Kingdom: Animalia \n Phylum: Chordata \n Class: Aves \n Order: Passeriformes \n Family: Fringillidae \n Subfamily: Carduelinae \n Genus: Spinus \n Species: S. tristis"}
            ScientificName={"Spinus tristis"}/>
    </View>
    
    );
}
export default ReadMore;
//back button
// <Button title="ABack" onPress={() => router.replace('/Grid')} ></Button>  