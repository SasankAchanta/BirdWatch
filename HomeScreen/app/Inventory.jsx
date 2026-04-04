import { View, Text } from 'react-native';
import NavBar from './NavBar';

export default function InventoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2F3820' }}>
      <Text style={{ color: 'white' }}>Inventory Screen</Text>
      <NavBar />
    </View>
  );
}