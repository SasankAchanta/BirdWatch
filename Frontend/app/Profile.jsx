import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getPhotos, getPoints } from './api';
import { getCaughtBirdNames } from "./GetBirds";

export default function ProfileScreen() {
  const [showAllPics, setShowAllPics] = useState(false);

  const [profile, setProfile] = useState(null);
  const [points, setPoints] = useState(0);
  const [collectedBirds, setCollectedBirds] = useState(0);
  const [pictures, setPictures] = useState([]);

  const togglePictures = () => setShowAllPics(prev => !prev);

  const loadData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const [photosData, caughtBirds, pointsData] = await Promise.all([
        getPhotos(token),
        getCaughtBirdNames(token),
        getPoints(token)
      ]);

      // photos
      const photoArray = Array.isArray(photosData)
        ? photosData
        : photosData?.photos || [];

      setPictures(photoArray);

      // birds
      setCollectedBirds(caughtBirds.length || 0);

      // points + username from backend
      setPoints(pointsData.points || 0);

      setProfile({
        name: pointsData.username || "?",
        username: pointsData.username || "?"
      });

    } catch (err) {
      console.log("Error loading profile data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ImageBackground source={{ uri: "https://i.pinimg.com/736x/9e/66/a9/9e66a9f584e2882b19309a43ae8716de.jpg" }} style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: '#000000b7' }}>

      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 40
      }}>
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#E8D5A3"
        }} />

        <View style={{ marginLeft: 15 }}>
          <Text style={{
            color: "#E8D5A3",
            fontSize: 28,
            fontWeight: "bold",
            fontFamily: 'LondrinaSolid'
          }}>
            {profile?.name || "?"}
          </Text>

          <Text style={{
            color: "#E8D5A3",
            fontSize: 20,
            fontFamily: 'LondrinaSolid'
          }}>
            @{profile?.username || "?"}
          </Text>
        </View>
      </View>

      {/* Points */}
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={{
          color: "#E8D5A3",
          fontSize: 28,
          fontWeight: "bold",
          fontFamily: 'LondrinaSolid'
        }}>
          Points: {points}
        </Text>
      </View>

      {/* Birds */}
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={{
          color: "#E8D5A3",
          fontSize: 28,
          fontWeight: "bold",
          fontFamily: 'LondrinaSolid'
        }}>
          Birds Collected: {collectedBirds}/524
        </Text>
      </View>

      {/* Pictures */}
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={{
          color: "#E8D5A3",
          fontSize: 28,
          fontWeight: "bold",
          fontFamily: 'LondrinaSolid'
        }}>
          Pictures:
        </Text>

        <ScrollView
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 20,
            gap: 15
          }}
        >
          {pictures
            .slice(0, showAllPics ? pictures.length : 3)
            .map((pic, index) => (
              <Image
                key={index}
                source={{ uri: pic.url }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 10,
                  backgroundColor: '#E8D5A3'
                }}
              />
            ))}
        </ScrollView>
      </View>
       <TouchableOpacity
            onPress={togglePictures}
            style={{
              width: 80,
              height: 40,
              alignSelf: 'center',

              top: 50,
              backgroundColor: '#E8D5A3',
              borderRadius: 10,
              padding: 10
            }}
          >
            <Text style={{fontFamily: 'LondrinaSolid-regular', fontSize: 15}}>
              {showAllPics ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>

    </View>
    </ImageBackground>

  );
}