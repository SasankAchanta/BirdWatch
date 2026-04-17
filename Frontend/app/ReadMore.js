import React from "react";
import { View, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import Style from './Style.js'; 
import Read from './Read.jsx'; 

import americanGoldfinch from './birdpics/american goldfinch.png';
import AGmap from './birdpics/area.png';
import AGPop from './birdpics/status.png';

import Cardinal from './birdpics/cardinal.jpg';
import CPop from './birdpics/CardinalStatus.png';
import Cmap from './birdpics/CardinalArea.png';

import barnOwl from './birdpics/barn owl.png';
import CBE from './birdpics/carmine bee eater.png';
import question from './birdpics/questionmark.png';


const BirdInfo = [
  {
    BirdPic: americanGoldfinch, Birdname: "Bird", PopuationPic: AGPop, Map: AGmap, ScientificName: "Spinus tristis",
    Facts: "Kingdom: Animalia \nPhylum: Chordata \nClass: Aves \nOrder: Passeriformes \nFamily: Fringillidae \nSubfamily: Carduelinae \nGenus: Spinus \nSpecies: S. tristis",
    Info: "The American goldfinch (Spinus tristis) is a small North American bird in the finch family. It is migratory, ranging from mid-Alberta to North Carolina during the breeding season, and from just south of the Canada-United States border to Mexico during the winter. The only finch in its subfamily to undergo a complete molt, the American goldfinch displays sexual dichromatism: the male is a vibrant yellow in the summer and an olive color during the winter, while the female is a dull yellow-brown shade which brightens only slightly during the summer. The male displays brightly colored plumage during the breeding season to attract a mate. The American goldfinch is a granivore and adapted for the consumption of seedheads, with a conical beak to remove the seeds and agile feet to grip the stems of seedheads while feeding. It is a social bird and will gather in large flocks while feeding and migrating. It may behave territorially during nest construction, but this aggression is short-lived. Its breeding season is tied to the peak of food supply, beginning in late July, which is relatively late in the year for a finch. This species is generally monogamous and produces one brood each year. Human activity has generally benefited the American goldfinch. It is often found in residential areas because it is attracted to bird feeders, which increase its survival rate in these areas. Deforestation also creates open meadow areas, which are its preferred habitat. \n \nREAD MORE ON WIKIPEDIA"
  },
  {
    BirdPic: Cardinal, Birdname: "Northern Cardinal", PopuationPic: CPop, Map: Cmap, ScientificName: "Cardinalis cardinalis",
    Facts: "Kingdom: Animalia \nPhylum: Chordata \nClass: Aves \nOrder: Passeriformes \nFamily: Cardinalidae \nGenus: Cardinalis \nSpecies: C. cardinalis",
    Info: "The northern cardinal (Cardinalis cardinalis), also commonly known as the common cardinal, red cardinal, or simply cardinal, is a bird in the genus Cardinalis. It can be found in southeastern Canada, through the eastern United States from Maine to Minnesota to Texas, New Mexico, southern Arizona, southern California and south through Mexico, Belize, and Guatemala. It is also an introduced species in a few locations such as Bermuda and all major islands of Hawaii since its introduction in 1929. Its habitat includes woodlands, gardens, shrublands, and wetlands. It is the state bird of Illinois, Indiana, Kentucky, North Carolina, Ohio, Virginia, and West Virginia. The northern cardinal is a mid-sized perching songbird with a body length of 21-23 cm (8.3-9.1 in) and a crest on the top of its head. The species expresses sexual dimorphism: Females are a reddish olive color, and have a gray mask around the beak, while males are a vibrant red color, and have a black mask on the face, as well as a larger crest. Juvenile cardinals do not have the distinctive red-orange beak seen in adult birds until they are almost fully mature. On hatching, their beaks are grayish-black and they do not become the trademark orange-red color until they acquire their final adult plumage in the fall. \n \nREAD MORE ON WIKIPEDIA"
  },
  {
    BirdPic: barnOwl, Birdname: "Barn Owl", PopuationPic: question, Map: question, ScientificName: "Place Holder",
    Facts: "Place Holder",
    Info: "Place Holder"
  },
  {
    BirdPic: CBE, Birdname: "Carmine Bee Eater", PopuationPic: question, Map: question, ScientificName: "Place Holder",
    Facts: "Place Holder",
    Info: "Place Holder"
  },
];

export default function ReadMore() {
  const router = useRouter();

  const { name } = useLocalSearchParams();
  const cleanName = decodeURIComponent(String(name ?? "")).trim();
  const bird = BirdInfo.find(
    b => b.Birdname.trim() === cleanName
  );  

  if (!bird) {
  return (
    <View>
      <Text>Bird not found: {cleanName}</Text>
    </View>
  );
}

  return (
    <View style={{ flex: 1 }}>
      <Read
        BirdPic={bird.BirdPic}
        PopuationPic={bird.PopuationPic}
        Info={bird.Info}
        Map={bird.Map}
        Birdname={bird.Birdname}
        Facts={bird.Facts}
        ScientificName={bird.ScientificName}
      />
    </View>
  );
}