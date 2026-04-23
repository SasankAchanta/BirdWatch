import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getPhotos } from './api';
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

      const [photosData, caughtBirds] = await Promise.all([
        getPhotos(token),
        getCaughtBirdNames(token)
      ]);

      // photos can be array or wrapped
      const photoArray = Array.isArray(photosData)
        ? photosData
        : photosData?.photos || [];

      setPictures(photoArray);

      setCollectedBirds(caughtBirds.length);

      // temp profile
      setProfile({
        name: "Birdwatcher",
        username: "birdwatcher_01"
      });

      setPoints(photoArray.length * 10);

    } catch (err) {
      console.log("Error loading profile data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2F3820' }}>

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
            {profile?.name || "Birdwatcher"}
          </Text>

          <Text style={{
            color: "#E8D5A3",
            fontSize: 20,
            fontFamily: 'LondrinaSolid'
          }}>
            @{profile?.username || "birdwatcher_01"}
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
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: '#E8D5A3'
                }}
              />
            ))}

          <TouchableOpacity
            onPress={togglePictures}
            style={{
              backgroundColor: '#E8D5A3',
              borderRadius: 10,
              padding: 10
            }}
          >
            <Text>
              {showAllPics ? "Show Less" : "Show More"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}