import React, { useState, useEffect } from "react";
import { View, Pressable, ScrollView, Text, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Style from "./Style.js";
import GridCard from "./GridCard.jsx";
import { getImage } from "./api";
import { getCaughtBirdNames } from "./GetBirds.js";

import AsyncStorage from "@react-native-async-storage/async-storage";



// backup bird, while it loads
const question = 'https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg'
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
        //get caught birds from backend
        const names = await getCaughtBirdNames(token);
        console.log("names:", names);

        //if no birds, prevent crash
        if (!Array.isArray(names) || names.length === 0) {
          setBirds([
            {
              BirdPic: question,
              Birdname: "Unknown Bird",
            },
          ]);
          return;
        }

        // gets image per bird
        const imageResults = await Promise.allSettled(
          names.map((name) => getImage(name, token))
        );

        const total = 524;
        //make bird objects from names
        const formatted = names.map((name, i) => {
          const res = imageResults[i];

          const url =
            res?.status === "fulfilled"
              ? res.value?.["img_url. "]?.[0]?.image_path
              : null;

          return {
            BirdPic: url || question,
            Birdname: name,
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
        style={{ alignSelf: "center", marginBottom: 20, width: 100, height: 40, backgroundColor: "#E9D1A6", justifyContent: "center", borderRadius: 15, borderWidth: 5, borderColor: "#D2A167", }}
        onPress={loadMore}>

        <Text style={{ color: "#2F3820", fontFamily: "LondrinaSolid-regular", fontSize: 20, textAlign: "center", }}>
          LOAD MORE </Text>
      </Pressable>
    );
  }

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/1200x/53/88/7b/53887bdfd9a21adfc230916f9fd87506.jpg' }} style={{ flex: 1 }}>
      <View style={Style.cardscreen}>
        <ScrollView contentContainerStyle={[Style.Grid, { paddingBottom: 120 }]}>
          {visibleBirds.map((bird, index) => (
            <GridCard
              key={index}
              BirdPic={bird.BirdPic}
              Birdname={bird.Birdname}
            />
          ))}

          {!isDone && (
            <Pressable
              style={{ alignSelf: "center", marginBottom: 20, width: 100, height: 40, backgroundColor: "#E9D1A6", justifyContent: "center", borderRadius: 15, borderWidth: 5, borderColor: "#D2A167", }}
              onPress={loadMore}>

              <Text style={{ color: "#2F3820", fontFamily: "LondrinaSolid-regular", fontSize: 20, textAlign: "center", }}>
                LOAD MORE </Text>
            </Pressable>
          )}
        </ScrollView>

        <Pressable
          style={{ position: "absolute", bottom: 100, left: 20, width: 60, height: 60, backgroundColor: "#E9D1A6", justifyContent: "center", alignItems: "center", borderRadius: 20, borderWidth: 5, borderColor: "#D2A167", }}
          onPress={() => router.replace("/Inventory")}>

          <Text style={{ color: "#2F3820", fontFamily: "LondrinaSolid-regular", fontSize: 40, }}>{"<"}</Text>

        </Pressable>
      </View>
    </ImageBackground>
  );
}

export default Grid;