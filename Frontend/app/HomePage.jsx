import React, { useState, useEffect } from "react";
import { Text, View, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPoints } from "./api.js";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLiveStats() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const data = await getPoints(token);

        setPoints(data.points || 0);

        setUserData({
          name: data.username || "FAKE BIRDWATCHER",
        });

        setLeaderboardData(data.leaderboard || []);

      } catch (error) {
        console.log("Failed to load home data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadLiveStats();
  }, []);

  return (
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/1200x/0c/34/eb/0c34ebd1e937148e8daec033b06f4b48.jpg" }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "#2f382096" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: insets.top,
            paddingBottom: 70,
          }}
        >
          <Text style={{ color: "white", fontSize: 50, fontFamily: "LondrinaSolid" }}>
            Welcome
          </Text>

          <View style={{ height: 30 }} />

          <View style={{ height: 400, borderRadius: 20, backgroundColor: "#FDFADF", width: "90%", padding: 10 }}>
            <Text style={{ color: "#89572A", fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 10, fontFamily: "LondrinaSolid-regular" }}>
              Leaderboard
            </Text>

            <View style={{ backgroundColor: "#778150", borderRadius: 12, flex: 1 }}>
              <FlatList
                data={leaderboardData}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}>
                    <Text style={{ color: "white", fontWeight: "bold", width: 35 }}>
                      {item.rank}
                    </Text>

                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#E8D5A3",
                        marginHorizontal: 10,
                      }}
                    />

                    <Text style={{ color: "white", flex: 1 }}>
                      {item.name}
                    </Text>

                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {item.score || 0} pts
                    </Text>
                  </View>
                )}
              />

              <View style={{ borderTopWidth: 1, borderColor: "#E8D5A3" }} />

              <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text style={{ color: "white", fontWeight: "bold", width: 35 }}>
                  ?
                </Text>

                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderWidth: 2,
                    borderColor: "#E8D5A3",
                    marginHorizontal: 10,
                  }}
                />

                <Text style={{ color: "white", flex: 1, fontFamily: "LondrinaSolid-regular" }}>
                  {userData?.name || "You"}
                </Text>

                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {points.toLocaleString()} pts
                </Text>
              </View>
            </View>
          </View>

        </View>

        {/* LOADING SCREEN OVERLAY */}
        {isLoading && (
          <View style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            justifyContent: "center", 
            alignItems: "center", 
            backgroundColor: "rgba(0,0,0,0.6)" // Dim transparent background
          }}>
            <ActivityIndicator size="large" color="#E8D5A3" />
            <Text style={{ color: "white", marginTop: 10, fontFamily: "LondrinaSolid" }}>
              Loading...
            </Text>
          </View>
        )}

      </View>
    </ImageBackground>
  );
}