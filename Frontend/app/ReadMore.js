import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import Read from "./Read.jsx";

import { getSummary, getImage, getMap } from "./api.js";

const question =
  "https://static.vecteezy.com/system/resources/previews/000/440/531/original/question-mark-vector-icon.jpg";

export default function ReadMore() {
  const { name } = useLocalSearchParams();
  const Name = decodeURIComponent(String(name ?? "")).trim();

  const [summary, setSummary] = useState("Loading...");
  const [image, setImage] = useState(question);
  const [map, setMap] = useState(question); // IMPORTANT: never null

  useEffect(() => {
    const load = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token || !Name) return;

        // ---------------- SUMMARY ----------------
        const summaryRes = await getSummary(Name, token);

        const text =
          summaryRes?.summary?.[0]?.summary ||
          "No summary available";

        setSummary(text);

        // ---------------- IMAGE ----------------
        const imageRes = await getImage(Name, token);

        const imageUrl =
          imageRes?.["img_url. "]?.[0]?.image_path ||
          question;

        setImage(imageUrl);

        // ---------------- MAP ----------------
        const mapRes = await getMap(Name, token);

        const mapUrl =
          mapRes?.["map_url. "]?.[0]?.map_path ||
          question;

        setMap(mapUrl);

      } catch (err) {
        console.log("Error loading bird data:", err);
        setSummary("Error loading summary");
        setImage(question);
        setMap(question);
      }
    };

    load();
  }, [Name]);

  return (
    <View style={{ flex: 1 }}>
      <Read
        BirdPic={image}
        Info={summary}
        Birdname={Name}
        Map={map}
      />
    </View>
  );
}