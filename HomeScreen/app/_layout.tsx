import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // This forces the "slide" transition across both iOS and Android (animation: 'slide_from_right')
        animation: 'none', 
        // Keeps the background consistent during the slide animation
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
