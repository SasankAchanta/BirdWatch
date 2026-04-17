import { useEffect, useState } from 'react';
import { Stack } from 'expo-router'; 
import { Asset } from 'expo-asset'; 
import { useFonts } from 'expo-font';
import NavBar from './NavBar';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LondrinaSolid: require('../assets/images/fonts/Londrina_Solid/LondrinaSolid-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor: '#2F3820' },
        }}
      />

      <NavBar />
    </>
  );
}