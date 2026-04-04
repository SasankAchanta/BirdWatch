import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 1. Move NavButton OUTSIDE and pass variables through props
const NavButton = ({ index, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <View style={{
      width: 50, 
      height: 50, 
      borderRadius: 25,
      backgroundColor: isSelected ? '#8E9569' : '#FFFFFF', // Uses isSelected prop
      marginTop: isSelected ? -30 : 0,                 // Uses isSelected prop
      borderWidth: 2,
      borderColor: '#2F3820'
    }} />
  </TouchableOpacity>
);

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const getPageIndex = () => {
    if (pathname === '/') return 0;
    if (pathname === '/Camera') return 1;
    if (pathname === '/Inventory') return 2;
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
      <View style={{
        position: 'absolute',
        top: -35,
        left: (page * tabWidth) + (tabWidth / 2) - 45,
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#2F3820',
        zIndex: 1
      }} />
      <View style={{ flexDirection: 'row', width: '100%', height: '100%', zIndex: 2 }}>
        {/* 2. Pass the data into the component here */}
        <NavButton 
          index={0} 
          isSelected={page === 0} 
          onPress={() => router.replace('/')} 
        />
        <NavButton 
          index={1} 
          isSelected={page === 1} 
          onPress={() => router.replace('/Camera')} 
        />
        <NavButton 
          index={2} 
          isSelected={page === 2} 
          onPress={() => router.replace('/Inventory')} 
        />
        <NavButton 
          index={3} 
          isSelected={page === 3} 
          onPress={() => router.replace('/Profile')} 
        />
      </View>
    </View>
  );
}