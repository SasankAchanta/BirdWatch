import React, { useState, useEffect } from "react";
import { View, Pressable, ScrollView, Text } from "react-native";
import { useRouter } from "expo-router";
import Style from "./Style.js";
import GridCard from "./GridCard.jsx";
import { getPhotos } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import question from "./birdpics/questionmark.png";

// backup bird, while it loads
const fallbackBirds = [
  { BirdPic: question, Birdname: "Unknown Bird" },
];

function Grid() {
  const router = useRouter();

  const [birds, setBirds] = useState(fallbackBirds);
  const [visibleCount, setVisibleCount] = useState(20);

  //gets images
  useEffect(() => {
    const load = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const data = await getPhotos(token);

        const photos = data.photos;
        
        //make sure an array is returned
        if (Array.isArray(photos) == false) {
            return;
        }
        if (photos.length === 0) {
            return;
        }
        
        // total birds to collect
        const total = 524; 
        
        // format the photos, image wiht name
        const formatted = photos.map((item, index) => {
          let pic;
          
          if (item.url) {
             pic = { uri: item.url };
          } else {
             pic = question;
          }

          return {
            BirdPic: pic,
            //place holder name change to get name of bird
            Birdname: "Bird",
          };
        });

        const collected = formatted.length;
        const remaining = total - collected;

        // fill the rest of the grid with unknown birds
        const placeholders = Array.from({ length: remaining }, () => ({
          BirdPic: question,
          Birdname: "Unknown Bird",
        }));

        // make all 524 birds, 
        setBirds([...formatted, ...placeholders]);
      } catch (err) {
        console.error("getPhotos failed:", err);
      }
    };

    load();
  }, []);

  // load 30 more birds
  const loadMore = () => {
    setVisibleCount((prev) => prev + 30);
  };

  // the birds we want to show right now 
  const visibleBirds = birds.slice(0, visibleCount);
  
  let isDone = false;
  if (visibleCount >= birds.length) {
      isDone = true;
  }

  // load more button shows if there are more birds to load
  let loadButton = null;
  if (isDone == false) {
      loadButton = (
         <Pressable
            style={{ alignSelf: "center", marginBottom: 20, width: 100, height: 40, backgroundColor: "#E9D1A6", justifyContent: "center", borderRadius: 15, borderWidth: 5, borderColor: "#D2A167",}}
            onPress={loadMore}>
          
            <Text style={{color: "#2F3820", fontFamily: "LondrinaSolid-regular", fontSize: 20, textAlign: "center", }}>
              LOAD MORE </Text>
          </Pressable>
      );
  }
  
  return (
    <View style={Style.cardscreen}>
      <ScrollView contentContainerStyle={[Style.Grid, {paddingBottom: 120}]}>
        {visibleBirds.map((bird, index) => (
          <GridCard
            key={index}
            BirdPic={bird.BirdPic}
            Birdname={bird.Birdname}
          />
        ))}

        {!isDone && (
          <Pressable
            style={{ alignSelf: "center", marginBottom: 20, width: 100, height: 40, backgroundColor: "#E9D1A6", justifyContent: "center", borderRadius: 15, borderWidth: 5, borderColor: "#D2A167",}}
            onPress={loadMore}>
          
            <Text style={{color: "#2F3820", fontFamily: "LondrinaSolid-regular", fontSize: 20, textAlign: "center", }}>
              LOAD MORE </Text>
          </Pressable>
        )}
      </ScrollView>

      <Pressable
        style={{position: "absolute", bottom: 100, left: 20, width: 60, height: 60, backgroundColor: "#E9D1A6", justifyContent: "center", alignItems: "center", borderRadius: 20, borderWidth: 5, borderColor: "#D2A167", }} 
        onPress={() => router.replace("/Inventory")}>

        <Text style={{color: "#2F3820", fontFamily: "LondrinaSolid-regular", fontSize: 40, }}>{"<"}</Text>

      </Pressable>
    </View>
  );
}

export default Grid;