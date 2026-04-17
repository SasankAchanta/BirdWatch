import { useState, useRef } from 'react';
import { View, PanResponder, Pressable, ImageBackground, Text} from 'react-native';
import BirdCard from './Cards.jsx';

import { useRouter, usePathname } from 'expo-router';


import americanGoldfinch from './birdpics/american goldfinch.png';
import barnOwl from './birdpics/barn owl.png';
import CBE from './birdpics/carmine bee eater.png';
import question from './birdpics/questionmark.png';
import cardinal from './birdpics/cardinal.jpg';
import Style from './Style.js';

function Scroll(){ 
  const router = useRouter();

//Bird array - needs to be changed to use DB, values not hardcoded
const birds = [
    { BirdPic: americanGoldfinch, Birdname: "American Goldfinch",  Rarity: "Common",
       info: "The American goldfinch (Spinus tristis) is a small North American bird in the finch family. It is migratory, ranging from mid-Alberta to North Carolina during the breeding season, and from just south of the Canada–United States border to Mexico during the winter..."},
    { BirdPic: barnOwl, Birdname: "Barn Owl", info: "White Owl", Rarity: "Uncommon" },
    { BirdPic: CBE, Birdname: "Carmine Bee Eater", Rarity: "Common", 
      info: "The southern carmine bee-eater (Merops nubicoides) is a species of bee-eater found across sub-equatorial Africa. It was formerly considered conspecific with the closely related northern carmine bee-eater, with the combined species then known as carmine bee-eater" },
    { BirdPic: cardinal, Birdname: "Northern Cardinal", Rarity: "Common", 
      info: "(Cardinalis cardinalis), also commonly known as the common cardinal, red cardinal, or simply cardinal, is a bird in the genus Cardinalis. It can be found in southeastern Canada, through the eastern United States from Maine to Minnesota to Texas, New Mexico..." },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rarity: "?" },

];

//indexes set
const [Index, setIndex] = useState(0);
  const PrevIndex = useRef(0);
  const PrevY = useRef(0);
  // px to drag per card
  const pxPerCard = 60; 

  //calclulates the direction and picks next card
  const step = (direction) => {
  let next;
  if (direction === 'up') {
    next = (PrevIndex.current + 1) % birds.length;
  } else {
    next = (PrevIndex.current - 1 + birds.length) % birds.length;
  }
  PrevIndex.current = next;
  setIndex(next);
};

//handles dragging and swiping and moving cards
  const panResponder = useRef(
    PanResponder.create({
      //touch movements 
      onMoveShouldSetPanResponder: () => true,

      // reset tracking when finger touches screen
      onPanResponderGrant: () => {
        PrevY.current = 0;
      },

      // move through cards based on distance dragged called while dragging
     onPanResponderMove: (_, { dy }) => {
      const delta = dy - PrevY.current;
      //if the distance dragged if far enough, change card
      if (Math.abs(delta) >= pxPerCard) {
        if (delta < 0) {
          step('up');
        } else {
          step('down');
        }
        //reset distance dragged
        PrevY.current = dy;
      }
    },

      // calculate the speed of the swipe and move cards, called when finger leaves screen
      onPanResponderRelease: (_, { vy }) => {
        PrevY.current = 0;
        const skip = Math.min(Math.round(Math.abs(vy) * 3), 8);
        let direction;
        //if speed is fast enough find the direction
        if (vy < 0) {
          direction = 'up';
        } else {
          direction = 'down';
        }
        //moves the correct number of cards in the direction
        for (let i = 1; i <= skip; i++) {
          setTimeout(() => step(direction), i * 60);
        }
      },
    })
  ).current;

  //calculates the next card based on current position
  const getPosition = (index, current, total) => {
    let diff = index - current;

    if (diff > total / 2){
      diff -= total;
    }
    if (diff < -total / 2){
      diff += total;
    }

    return diff;
  };

  return (
    <ImageBackground source={{uri: 'https://i.pinimg.com/1200x/4f/e9/3a/4fe93a8428778e21e9d8211e4088b08f.jpg'}}  style={{ flex: 1}}>
            <View style={{ flex: 1, backgroundColor: "#262d1ebe" }}>
      
    <View style={Style.cardscreen}>
    <View style={Style.CardContainer} {...panResponder.panHandlers}>
      <Pressable style={Style.gridButton}onPress={() => router.replace('/Grid')}>
        <Text style={{color:"#2F3820", fontFamily: 'LondrinaSolid-regular', fontSize: 30, textAlign: 'center', justifyContent:'center' }}>GRID</Text>
      </Pressable>

      {birds.map((bird, index) => {
        const position = getPosition(index, Index, birds.length);
        //only show cards that are only 2 indexes away
        if(Math.abs(position) > 3){
          return null;
        }
        //bird card maker
        return (
          <BirdCard
            key={index}
            BirdPic={bird.BirdPic}
            Birdname={bird.Birdname}
            info={bird.info}
            Rarity={bird.Rarity}
            position={position}
          />
        );
      })}
    </View>
    </View>
    </View>
    </ImageBackground>
  );
}

export default Scroll;