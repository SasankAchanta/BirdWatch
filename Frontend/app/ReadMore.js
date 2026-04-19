import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import Read from "./Read.jsx";

import { getSummary, getImage } from "./api.js";

/*THINGS LEFT ON THIS PAGE
  MAP
*/

// fallback image
const question = "https://static.vecteezy.com/system/resources/previews/000/440/531/original/question-mark-vector-icon.jpg";

const HARDCODEDMAP = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Spinus_tristis_map.svg/500px-Spinus_tristis_map.svg.png';

export default function ReadMore() {

  //get name from grid
  const { name } = useLocalSearchParams();

  //clean name
  const Name = decodeURIComponent(String(name ?? "")).trim();

  const [summary, setSummary] = useState(null);
  const [image, setImage] = useState(question);

  useEffect(() => {
    const load = async () => {
      try {

        //get token
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("no token");
          return;
        }

        if (!Name) {
          console.log("no name");
          return;
        }

        //get summary, defult then actual summary
        const summaryRes = await getSummary(Name, token);
        let text = "No summary available";

        if (summaryRes) {
          if (summaryRes.summary) {
            if (summaryRes.summary[0]) {
              if (summaryRes.summary[0].summary) {
                text = summaryRes.summary[0].summary;
              }
            }
          }
        }

        /*MAP GOES HERE
          use the same method as the summary and image
          make a endpoint in API.js liek the other ones wit hthe paramters needed
          endpoint should be like the other ones that need bird name and token
          just place the map getter here based on name and place that variable in the Map at the bottom
        */

        setSummary(text);

        //get image, question = deafult, replaced by bird image
        const imageRes = await getImage(Name, token);

        let url = question;

        if (imageRes) {
          if (imageRes["img_url. "]) {
            if (imageRes["img_url. "][0]) {
              url = imageRes["img_url. "][0].image_path;
            }
          }
        }

        setImage(url);

      } catch (err) {
        console.log("Error loading bird data:", err);
        setSummary("Error loading summary");
        setImage(question);
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
        Facts="Place Holder Fact"
        ScientificName=" Scientific name"
        //population pic var goes here
        PopuationPic={null}
        //put MAP variable here
        Map={HARDCODEDMAP}
      />
    </View>
  );
}