import React from 'react';
import { Text, View, FlatList, ImageBackground} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavBar from './NavBar';



const LEADERBOARD_DATA = [
  { id: '1', rank: 1, name: 'Bobby', score: '10,000' },
  { id: '2', rank: 2, name: 'birdwatcher_02', score: '10,000' },
  { id: '3', rank: 3, name: 'birdwatcher_03', score: '10,000' },
  { id: '4', rank: 4, name: 'birdwatcher_04', score: '10,000' },
  { id: '5', rank: 5, name: 'birdwatcher_05', score: '10,000' },
  { id: '6', rank: 6, name: 'birdwatcher_06', score: '10,000' },
  { id: '7', rank: 7, name: 'birdwatcher_07', score: '10,000' },
  { id: '8', rank: 8, name: 'birdwatcher_08', score: '10,000' },
  { id: '9', rank: 9, name: 'birdwatcher_09', score: '10,000' },
  { id: '10', rank: 10, name: 'birdwatcher_10', score: '10,000' },
];

const YOU = { id: '105', rank: 105, name: 'You', score: '6,700' };

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/1200x/0c/34/eb/0c34ebd1e937148e8daec033b06f4b48.jpg' }} style={{ flex: 1}}>
      <View style={{ flex: 1, backgroundColor: "#2f382096" }}>
      <View style={{
        flex: 1,
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: 70 // Leave space for the NavBar
      }}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Text style={{ color: "white", fontSize: 50, fontFamily: 'LondrinaSolid' }}>
            Welcome
          </Text>
          <Text style={{ color: "#A97A51", fontSize: 30, fontFamily: 'LondrinaSolid' }}>
            Streak: 0 days🔥
          </Text>
          <View style={{ height: 30 }} />
          <View style={{ height: 400, borderRadius: 20, backgroundColor: "#FDFADF", width: "90%", padding: 10 }}>
            <Text style={{ color: "#89572A", fontWeight: "bold", fontSize: 20, textAlign: "center", marginBottom: 10, fontFamily: 'LondrinaSolid' }}>
              Leaderboard
            </Text>
            <View style={{ backgroundColor: "#778150", borderRadius: 12, flex: 1 }}>
              <FlatList
                data={LEADERBOARD_DATA}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 5, paddingBottom: 5 }}
                showsVerticalScrollIndicator={true}
                indicatorStyle="white"
                renderItem={({ item }) => (
                  <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}>
                    <Text style={{ color: "white", fontWeight: "bold", width: 35 }}>{item.rank}</Text>
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#E8D5A3", marginHorizontal: 10 }} />
                    <Text style={{ color: "white", flex: 1, fontFamily: 'LondrinaSolid' }}>{item.name}</Text>
                    <Text style={{ color: "white", fontWeight: "bold", fontFamily: 'LondrinaSolid' }}>{item.score} pts</Text>
                  </View>
                )}
              />
              <View style={{ borderBottomWidth: 1, borderBottomColor: "#E8D5A3", marginHorizontal: 10 }} />
              <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 10 }}>
                <Text style={{ color: "white", fontWeight: "bold", width: 35 }}>{YOU.rank}</Text>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "transparent", borderWidth: 2, borderColor: "#E8D5A3", marginHorizontal: 10 }} />
                <Text style={{ color: "white", fontWeight: "bold", flex: 1 }}>{YOU.name}</Text>
                <Text style={{ color: "white", fontWeight: "bold" }}>{YOU.score} pts</Text>
              </View>
            </View>
          </View>
        </View>
        <NavBar />
      </View>
      </View>
    </ImageBackground>
  );
}