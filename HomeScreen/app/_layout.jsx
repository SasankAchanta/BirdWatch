import { useEffect, useState } from 'react';
import { Stack, SplashScreen } from 'expo-router'; 
import { Asset } from 'expo-asset'; 
import { useFonts } from 'expo-font';

// 1. Tell Expo to keep the splash screen up
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  // --- HOOKS SECTION (Must run every time) ---

  // 2a. Start loading fonts
  const [fontsLoaded] = useFonts({
    'LondrinaSolid': require('../assets/images/fonts/Londrina_Solid/LondrinaSolid-Regular.ttf')
  });

  // 2b. Start tracking image loading
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 3. The preloading logic for images
  useEffect(() => {
    async function prepareImages() {
      try {
        await Asset.loadAsync([
          require('./icons/HomeSolid.png'), 
          require('./icons/Camera.png'),
          require('./icons/Photo.png'),
          require('./icons/profile.png'),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setImagesLoaded(true);
      }
    }

    prepareImages();
  }, []);

  // 4. Hide the splash screen ONLY when BOTH fonts and images are ready
  useEffect(() => {
    if (fontsLoaded && imagesLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, imagesLoaded]);


  // --- RENDER SECTION ---

  // 5. The "Gate": Do not render the actual UI until both are finished.
  // Notice this is safely below all the hooks!
  if (!fontsLoaded || !imagesLoaded) {
    return null; 
  }

  // 6. Your original Stack renders instantly with fonts and icons in memory
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none', 
        contentStyle: { backgroundColor: '#2F3820' } 
      }}
    >
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="index" />
      <Stack.Screen name="HomePage" />
      <Stack.Screen name="Camera" />
      <Stack.Screen name="Inventory" />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}