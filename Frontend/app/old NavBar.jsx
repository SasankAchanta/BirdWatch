import React from 'react';
import { View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 1. Move NavButton OUTSIDE and pass variables through props
const NavButton = ({ index, isSelected, onPress, iconSource }) => (
  
  <TouchableOpacity
    onPress={onPress}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Image source={iconSource} style={{
      padding:5,
      borderRadius:25,
      backgroundColor: isSelected ? '#8E9569' : '#ffffff00', // Uses isSelected prop
      marginTop: isSelected ? -30 : 0,
      width: isSelected ? 55:50, 
      height: isSelected ? 55: 50,
                       // Uses isSelected prop
    }} />
  </TouchableOpacity>
);

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const hideOnRoutes = ['/', '/SignUp'];

  if (hideOnRoutes.includes(pathname)) {
    return null;
  } 

  const getPageIndex = () => {
    if (pathname === '/') return 0;
    if (pathname === '/HomePage') return 0;
    if (pathname === '/Camera') return 1;
    if (pathname === '/Inventory') return 2;
    if (pathname === '/Grid') return 2;
    if (pathname === '/ReadMore') return 2;
    if (pathname === '/Profile') return 3;
   
    return 0;
  };
  

  const page = getPageIndex();
  const tabWidth = SCREEN_WIDTH / 4;

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 70,
      backgroundColor: '#8E9569',
    }}>
      <View 
      style={{
        position: 'absolute',
        top: -35,
        left: (page * tabWidth) + (tabWidth / 2) - 45,
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#2f3820',
        zIndex: 1
      }} />
      <View style={{ flexDirection: 'row', width: '100%', height: '100%', zIndex: 2 }}>
        {/* 2. Pass the data into the component here */}
        <NavButton 
          index={0} 
          isSelected={page === 0} 
          onPress={() => router.replace('/HomePage')}
          iconSource={require('./icons/HomeSolid.png')} 
        />
        <NavButton 
          index={1} 
          isSelected={page === 1} 
          onPress={() => router.replace('/Camera')} 
          iconSource={require('./icons/Camera.png')}
        />
        <NavButton 
          index={2} 
          isSelected={page === 2} 
          onPress={() => router.replace('/Inventory')} 
          iconSource={require('./icons/Photo.png')}
        />
        <NavButton 
          index={3} 
          isSelected={page === 3} 
          onPress={() => router.replace('/Profile')}
          iconSource={require('./icons/profile.png')}
        />
      </View>
    </View>
  );
}