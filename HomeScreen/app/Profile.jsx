import { View, Text, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
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

      {/* Settings Section - Adjusted to be higher */}
      <View style={{ 
        alignItems: 'center', // Keep it centered horizontally
        marginTop: 100,       // Adjust this number to move it up or down
      }}>
        <Text style={{ 
          color: "white", 
          fontSize: 32, 
          fontWeight: "bold", 
          fontFamily: 'LondrinaSolid' 
        }}>
          Settings
        </Text>
      </View>

    </SafeAreaView>
  );
}