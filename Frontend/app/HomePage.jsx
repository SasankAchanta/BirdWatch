import React, { useState, useEffect } from "react";
import { Text, View, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPoints, getLeaderboard } from "./api.js";
import drippybird from './birdpics/drippybird.png'


export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLiveStats() {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        // Get user
        const user = await getPoints(token);
        setPoints(user.points || 0);

        const username = user.username || "FAKE BIRDWATCHER";
        setUserData({ name: username });

        // Get leaderboard
        const leaderboardRes = await getLeaderboard(token);

        const formatted = leaderboardRes.leaderboard.map((item, index) => ({
          rank: index + 1,
          name: item.username,
          score: item.points,
        }));

        setLeaderboardData(formatted);

        //Calculate rank
        const foundIndex = leaderboardRes.leaderboard.findIndex(
          (item) => item.username === username
        );

        setRank(foundIndex >= 0 ? foundIndex + 1 : null);

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
          <Text style={{ color: "white", fontSize: 50, fontFamily: "LondrinaSolid-regular" }}>
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
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}>
                    
                    <Text style={{ color: "white", fontWeight: "bold", width: 35, textAlign: "center", fontFamily: "LondrinaSolid-regular" }}>
                      {item.rank}
                    </Text>

                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#E8D5A3",
                        marginHorizontal: 15,
                      }}
                    />

                    <Text style={{ color: "white", flex: 1, fontFamily: "LondrinaSolid-regular" }}>
                      {item.name}
                    </Text>

                    <Text style={{ color: "white", fontWeight: "bold", fontFamily: "LondrinaSolid-regular" }}>
                      {item.score || 0} pts
                    </Text>

                  </View>
                )}
              />

              <View style={{ borderTopWidth: 1, borderColor: "#E8D5A3" }} />

              <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                
                <Text style={{ color: "white", fontWeight: "bold", width: 35, textAlign: "center", fontFamily: "LondrinaSolid-regular" }}>
                  {rank ?? "?"}
                </Text>

                <View
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: "#E8D5A3",
                    overflow: "hidden",
                    marginHorizontal: 10,
                  }}
                >
              <ImageBackground source={drippybird} style={{ width: '100%', height: '100%' }} />
              </View>

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

        {/* LOADING OVERLAY */}
        {isLoading && (
          <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)"
          }}>
            <ActivityIndicator size="large" color="#E8D5A3" />
            <Text style={{ color: "white", marginTop: 10, fontFamily: "LondrinaSolid-regular" }}>
              Loading...
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}