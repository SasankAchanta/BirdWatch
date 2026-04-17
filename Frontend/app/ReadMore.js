import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Read from "./Read.jsx";
import AGPop from "./birdpics/status.png";

import { getSummary, getImage } from "./api.js";

//placeholder bird - no get name population pic scientific name or facts in backend
const bird = {
  Birdname: "AMERICAN GOLDFINCH",
  PopulationPic: AGPop,
  ScientificName: "Spinus tristis",
  Facts: "Place Holder",
};

//can change to getname endpoint 
const name = "AMERICAN GOLDFINCH";

export default function ReadMore() {
  const [summary, setSummary] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        //get token
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          setLoading(false);
          return;
        }

        //get the summary of 
        const summaryRes = await getSummary(name, token);

        //no summary
        const text =
          summaryRes?.summary?.[0]?.summary ?? "No summary available";

        setSummary(text);

        //get image
        const imageRes = await getImage(name, token);

        //no image
        const imgUrl = imageRes?.["img-url"] ?? null;
        setImage(imgUrl);

        setLoading(false);
      } catch (err) {
        console.error("Error loading bird data:", err);
        setSummary("Error loading summary");
        setImage(null);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  //load info
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Read
        BirdPic={image}
        PopuationPic={bird.PopulationPic}
        Info={summary}
        Map={null}
        Birdname={bird.Birdname}
        Facts={bird.Facts}
        ScientificName={bird.ScientificName}
      />
    </View>
  );
}