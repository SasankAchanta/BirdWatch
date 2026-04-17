import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [showAllPics, setShowAllPics] =  useState(false);

  const [profile, setProfile] = useState(null);
  const [points, setPoints] = useState(0);
  const [collectedBirds, setCollectedBirds] = useState(0);
  const [pictures, setPictures] = useState([]);

  function handleShowAllBirds() {setShowAllPics(!showAllPics);} 
  async function getUser(){  {/*This function is where the user API call will go */}
      try{
        const response = await fetch();
        const data = await response.json();
        setProfile(data);
      }catch(err){
        console.log("Error geting user profile", err);
      }
  }
  async function getPoints(){  {/*This function is where the points API call will go */}
      try{
        const response = await fetch();
        const data = await response.json();
        setPoints(data.points);
      }catch(err){
        console.log("Error geting points", err);
      }
  }
  async function getCollectedBirds(){ {/*This function is where the users birds API call will go */}
    try{
        const response = await fetch();
        const data = await response.json();
        setCollectedBirds(data.count);
      }catch(err){
        console.log("Error geting collected birds", err);
      }
  }
  async function getPictures(){  {/*This function is where the pictures API  of all teh birds user has call will go */}
    try{
        const response = await fetch();
        const data = await response.json();
        setPictures(data);
      }catch(err){
        console.log("Error geting pictures", err);
      }
  }

  useEffect(() => {
  const loadData = async () => {
    try { // Fires all calls at once and waits for all to finish
      await Promise.all([
        getUser(),
        getPoints(),
        getCollectedBirds(),
        getPictures()
      ]);
    } catch (error) {
      console.log("One or more calls failed", error);
    }
  };
  loadData();
}, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2F3820' }}>

      
      {/* Top Header Section */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        marginTop: 40 
      }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "#E8D5A3" }} />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>
            {profile ? profile.name : "Birdwatcher"}
          </Text>
          <Text style={{ color: "#E8D5A3", fontSize: 20, fontFamily: 'LondrinaSolid' }}>
            {profile ? `@${profile.username}` : "@birdwatcher_01"}
          </Text>
        </View>
      </View>

      <View style = {{alignItems: 'center', marginTop: 30}}> 
         <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>
           Achievements
           <ScrollView horizontal={true}>

           </ScrollView>
         </Text>
      </View>

      
      <View style={{ alignItems: 'center', marginTop: 40}}>
        <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>
            Points: {points}
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40}}>
        <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>
            Birds Collected: {collectedBirds}/500
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40}}>
        <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}> Pictures:</Text>
      <ScrollView 
      horizontal={true} 
      contentContainerStyle={{ alignItems: 'center', marginTop: 10, paddingHorizontal: 20, gap: 15}}
      >
     {pictures.slice(0, showAllPics ? pictures.length : 3).map((pic, index) => (
     <Image
       key={index}
       source={{ uri: pic.url }} 
       style={{ width: 50, height: 50, borderRadius: 10, backgroundColor: '#E8D5A3' }}
     />
     ))}

      <TouchableOpacity 
      onPress={handleShowAllBirds} 
      style={{ backgroundColor: '#E8D5A3', borderRadius: 10, padding: 10 }}
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