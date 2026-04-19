import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// NOTE FOR BACKEND: Replace this URL with the endpoint
const BASE_URL = ''; 

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  // LIVE DATA STATES
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLiveStats() {
      try {
        
        // MAKE YOUR CONNECTION TO BACKEND HERE
        const response = await fetch(`${BASE_URL}/home-data`);
        const data = await response.json();

        // LEADERBOARD & USER DATA  
        setLeaderboardData(data.leaderboard);
        setUserData(data.user);
      } catch (error) {
        console.log("Waiting for backend connection...");
      } finally {

        // CHANGE: Only stops loading if a URL actually exists
        if (BASE_URL !== '') {
          setIsLoading(false);
        }
      }
    }

    loadLiveStats();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2f3820' }}>
        <ActivityIndicator size="large" color="#E8D5A3" />
        <Text style={{ color: 'white', marginTop: 10, fontFamily: 'LondrinaSolid' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/1200x/0c/34/eb/0c34ebd1e937148e8daec033b06f4b48.jpg' }} style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#2f382096" }}>
        <View style={{
          flex: 1,
          alignItems: "center",
          paddingTop: insets.top,
          paddingBottom: 70 
        }}>
          <View style={{ alignItems: "center", width: "100%" }}>
            <Text style={{ color: "white", fontSize: 50, fontFamily: 'LondrinaSolid' }}>
              Welcome
            </Text>
            {/* STREAK */}
            <Text style={{ color: "#A97A51", fontSize: 30, fontFamily: 'LondrinaSolid' }}>
              Streak: {userData?.streak || 0} days🔥
            </Text>
            
            <View style={{ height: 30 }} />
            
            <View style={{ height: 400, borderRadius: 20, backgroundColor: "#FDFADF", width: "90%", padding: 10 }}>
              <Text style={{ color: "#89572A", fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 10, fontFamily: 'LondrinaSolid' }}>
                Leaderboard
              </Text>
              
              <View style={{ backgroundColor: "#778150", borderRadius: 12, flex: 1 }}>
                <FlatList
                  data={leaderboardData}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 5, paddingBottom: 5 }}
                  showsVerticalScrollIndicator={true}
                  indicatorStyle="white"
                  renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}>
                      <Text style={{ color: "white", fontWeight: "bold", width: 35 }}>{item.rank}</Text>
                      <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#E8D5A3", marginHorizontal: 10 }} />
                      <Text style={{ color: "white", flex: 1, fontFamily: 'LondrinaSolid' }}>{item.name}</Text>
                      <Text style={{ color: "white", fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>{item.score.toLocaleString()} pts</Text>
                    </View>
                  )}
                />
                
                <View style={{ borderBottomWidth: 1, borderBottomColor: "#E8D5A3", marginHorizontal: 10 }} />
                
                {/* "YOU" PROFILE SUMMARY */}
                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 10 }}>
                  <Text style={{ color: "white", fontWeight: "bold", width: 35 }}>{userData?.rank || '?'}</Text>
                  <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "transparent", borderWidth: 2, borderColor: "#E8D5A3", marginHorizontal: 10 }} />
                  <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>{userData?.name || 'You'}</Text>
                  <Text style={{ color: "white", fontWeight: "bold" }}>{userData?.score?.toLocaleString() || 0} pts</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}