import React, {useState} from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [showAllPics, setShowAllPics] =  useState(false);
  function handleShowAllBirds() {setShowAllPics(!showAllPics);}
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
            Birdwatcher
          </Text>
          <Text style={{ color: "#E8D5A3", fontSize: 20, fontFamily: 'LondrinaSolid' }}>
            @birdwatcher_01
          </Text>
        </View>
      </View>

      <View style = {{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 0, justifyContent: 'flex-end' }}> 
         <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>
           Achievements
         </Text>
      </View>

      
      <View style={{ alignItems: 'center', marginTop: 30}}>
        <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>
            Points: 1000
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 30}}>
        <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>
            Birds Collected: 5/500
        </Text>
      </View>

      <View style={{ alignItems: 'center', marginTop: 30}}>
        <Text style={{ color: "#E8D5A3", fontSize: 28, fontWeight: "bold", fontFamily: 'LondrinaSolid' }}> Pictures:</Text>
            <ScrollView 
            horizontal = {true} 
            contentContainerStyle={{ alignItems: 'center', marginTop: 10, paddingHorizontal: 20, gap: 15}}>
            <Image
              source = {{}}
              style = {{width: 50, height: 50, marginRight: 10, borderRadius: 10, paddingHorizontal: 20, gap: 15, backgroundColor: '#E8D5A3'}}
            />
            <Image
              source = {{}}
              style = {{width: 50, height: 50, marginRight: 10, borderRadius: 10, paddingHorizontal: 20, gap: 15, backgroundColor: '#E8D5A3'}}
            />
            <Image
              source = {{}}
              style = {{width: 50, height: 50, marginRight: 10, borderRadius: 10, paddingHorizontal: 20, gap: 15, backgroundColor: '#E8D5A3'}}
            />

            {showAllPics && (
            <>
            <Image
              source = {{}}
              style = {{width: 50, height: 50, marginRight: 10, borderRadius: 10, paddingHorizontal: 20, gap: 15, backgroundColor: '#E8D5A3'}}
            />
            <Image
              source = {{}}
              style = {{width: 50, height: 50, marginRight: 10, borderRadius: 10, paddingHorizontal: 20, gap: 15, backgroundColor: '#E8D5A3'}}
            />
            <Image
              source = {{}}
              style = {{width: 50, height: 50, marginRight: 10, borderRadius: 10, paddingHorizontal: 20, gap: 15, backgroundColor: '#E8D5A3'}}
            />
            </>
            )}
            <TouchableOpacity onPress = {handleShowAllBirds} style={{ backgroundColor: '#E8D5A3', padding: 10, borderRadius: 10, fontFamily: 'LondrinaSolid' }}>{showAllPics ? "Show Less" : "Show More"}</TouchableOpacity> {/* If "all pics showing" is true? If yes, 'Show Less'. If no, 'Show More' */}
            </ScrollView>
      </View>

    </SafeAreaView>
  );
}