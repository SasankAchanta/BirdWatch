import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none', 
        contentStyle: { backgroundColor: '#2F3820' } 
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="Camera" />
      <Stack.Screen name="Inventory" />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}
