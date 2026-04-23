import { useState, useRef, useEffect } from 'react';
import { View, PanResponder, Pressable, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BirdCard from './Cards.jsx';
import { useRouter } from 'expo-router';
import { getImage, getSummary } from './api.js';
import { getCaughtBirdNames } from "./GetBirds.js";
import Style from './Style.js';

//THING LEFT ON THIS PAGE
//RARITY CALCULATION, everything right now is hardcoded to common idk how to calculate rarity, if you do just calculate is and store in the rare variable

const question =
  "https://static.vecteezy.com/system/resources/previews/000/440/531/original/question-mark-vector-icon.jpg";

// default card, not clickable, shows while others load
const TestBirds = [
  { BirdPic: question, Birdname: "Unknown Bird", Rarity: "?", info: "Unknown Bird" },
];

function Scroll() {
  const router = useRouter();

  const [birds, setBirds] = useState(TestBirds);
  const birdsRef = useRef(birds);

  const [Index, setIndex] = useState(0);
  const PrevIndex = useRef(0);
  const PrevY = useRef(0);
  const pxPerCard = 60;

  //keep latest birds in ref
  useEffect(() => {
    birdsRef.current = birds;
  }, [birds]);

  useEffect(() => {
    const fetchData = async () => {

      //token
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      //get names
      const names = await getCaughtBirdNames(token);
      console.log("names:", names);

      //no birds
      if (!Array.isArray(names) || names.length === 0) {
        setBirds([
          {
            BirdPic: question,
            Birdname: "Unknown Bird",
            Rarity: "?",
            info: "Unknown Bird",
          },
        ]);
        return;
      }

      const rare = "?";

      //get images
      const imageResults = await Promise.allSettled(
        names.map((name) => getImage(name, token))
      );

      //make bird card wiht name
      const initialBirds = names.map((name, i) => {

        const res = imageResults[i];

        let url = null;

        if (res) {
          if (res.status === "fulfilled") {
            if (res.value) {
              if (res.value["img_url. "]) {
                if (res.value["img_url. "][0]) {
                  url = res.value["img_url. "][0].image_path;
                }
              }
            }
          }
        }

        if (!url) url = question;
        
        //birdcard made with image, name, rarity(change), info = loading until summary is gotten
        return {
          BirdPic: url,
          Birdname: name,
          Rarity: rare,
          info: "Loading...",
        };
      });

      //get summaries
      const summaryResults = await Promise.allSettled(
        initialBirds.map((b) => getSummary(b.Birdname, token))
      );

      //cut text a nd add ... to the end
      const truncateWords = (text, maxWords) => {
        if (!text) return "";

        const words = text.split(" ");

        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + "...";
        }

        return text;
      };

      //final birds
      const finalBirds = initialBirds.map((bird, i) => {

        const res = summaryResults[i];

        if (!res) return bird;
        if (res.status !== "fulfilled") return bird;
        if (!res.value) return bird;

        let raw = null;

        if (res.value.summary) {
          if (res.value.summary[0]) {
            raw = res.value.summary[0].summary;
          }
        }

        if (!raw){
          return bird;
        }

        return {
          ...bird,
          info: truncateWords(raw, 60),
        };
      });

      setBirds(finalBirds);
    };

    fetchData();
  }, []);

  //move cards
  const step = (direction) => {

    let next = 0;

    if (direction === "up") {
      next = (PrevIndex.current + 1) % birdsRef.current.length;
    } else {
      next = (PrevIndex.current - 1 + birdsRef.current.length) % birdsRef.current.length;
    }

    PrevIndex.current = next;
    setIndex(next);
  };

  //swipe handler
  const panResponder = useRef(
    PanResponder.create({

      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        PrevY.current = 0;
      },

      onPanResponderMove: (_, { dy }) => {

        const delta = dy - PrevY.current;

        if (Math.abs(delta) >= pxPerCard) {
          if (delta < 0) {
            step("up");
          } else {
            step("down");
          }

          PrevY.current = dy;
        }
      },

      onPanResponderRelease: (_, { vy }) => {

        PrevY.current = 0;

        const skip = Math.min(Math.round(Math.abs(vy) * 3), 8);

        let direction = "down";

        if (vy < 0) {
          direction = "up";
        }

        for (let i = 1; i <= skip; i++) {
          setTimeout(() => step(direction), i * 60);
        }
      },
    })
  ).current;

  const getPosition = (index, current, total) => {

    let diff = index - current;

    if(diff > total / 2){
       diff = diff - total;
    }
    if(diff < -total / 2){
      diff = diff + total;
    }
    return diff;
  };

  return (
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/1200x/4f/e9/3a/4fe93a8428778e21e9d8211e4088b08f.jpg" }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "#262d1ebe" }}>
        <View style={Style.cardscreen}>
          <View style={Style.CardContainer} {...panResponder.panHandlers}>

            <Pressable style={Style.gridButton} onPress={() => router.replace('/Grid')}>
              <Text style={{
                color: "#2F3820",
                fontFamily: 'LondrinaSolid-regular',
                fontSize: 30,
                textAlign: 'center'
              }}>
                GRID
              </Text>
            </Pressable>

            {birds.map((bird, index) => {

              const position = getPosition(index, Index, birds.length);

              if (Math.abs(position) > 3){
                return null;
              }

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