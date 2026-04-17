import { useState, useRef, useEffect } from 'react';
import { View, PanResponder, Pressable, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BirdCard from './Cards.jsx';
import { useRouter } from 'expo-router';
import { getPhotos, getSummary } from './api'; // adjust path if needed

import americanGoldfinch from './birdpics/american goldfinch.png';
import barnOwl from './birdpics/barn owl.png';
import CBE from './birdpics/carmine bee eater.png';
import question from './birdpics/questionmark.png';
import cardinal from './birdpics/cardinal.jpg';
import Style from './Style.js';

// Your original array — BirdPic and info will get overwritten by backend data
const TestBirds = [
  { BirdPic: americanGoldfinch, Birdname: "American Goldfinch", Rarity: "Common",   info: "Loading..." },
  { BirdPic: barnOwl, Birdname: "Barn Owl", Rarity: "Uncommon", info: "Loading..." },
  { BirdPic: barnOwl, Birdname: "American Dipper", Rarity: "Uncommon", info: "Loading..." },
  { BirdPic: americanGoldfinch, Birdname: "American Flamingo", Rarity: "Uncommon", info: "Loading..." },
  { BirdPic: americanGoldfinch, Birdname: "Bald Eagle", Rarity: "Rare", info: "Loading..." },
];

function Scroll() {
  const router = useRouter();
  const [birds, setBirds] = useState(TestBirds);
  const [Index, setIndex] = useState(0);
  const PrevIndex = useRef(0);
  const PrevY = useRef(0);
  const pxPerCard = 60;

  useEffect(() => {
  //token
  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    //get summary
    const summaryResults = await Promise.allSettled(
      TestBirds.map((b) => getSummary(b.Birdname, token))
    );

    //cut summary to specified word length
    const truncateWords = (text, maxWords) => {
    if (!text) {
      return text;
    }

    //add ... to the end of the summary
    const words = text.split(' ');
    if (words.length <= maxWords) {
      return text;
    } else {
      return words.slice(0, maxWords).join(' ') + '...';
    }
  };

  setBirds((prev) =>
  prev.map((bird, i) => {
    const res = summaryResults[i];

    if (res.status !== 'fulfilled') {
      return bird;
    }

    const val = res.value;

    let rawSummary = null;

    if (val && val.summary) {
      if (Array.isArray(val.summary)) {
        if (val.summary.length > 0) {
          if (val.summary[0] && val.summary[0].summary) {
            rawSummary = val.summary[0].summary;
          }
        }
      }
    }

    // cut summary to 60 words
    if (rawSummary) {
      const summary = truncateWords(rawSummary, 60);
      return { ...bird, info: summary };
    } else {
      return bird;
    }
  })
  );
  };

  fetchData();
}, []);

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