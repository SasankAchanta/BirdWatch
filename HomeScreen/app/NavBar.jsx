import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  const NavButton = ({ index, route }) => (
    <TouchableOpacity
      onPress={() => router.replace(route)} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{
        width: 50, height: 50, borderRadius: 25,
        backgroundColor: page === index ? '#8E9569' : '#FFFFFF',
        marginTop: page === index ? -30 : 0,
        borderWidth: 2,
        borderColor: '#2F3820'
      }} />
    </TouchableOpacity>
  );

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
        <NavButton index={0} route="/" />
        <NavButton index={1} route="/Camera" />
        <NavButton index={2} route="/Inventory" />
        <NavButton index={3} route="/Profile" />
      </View>
    </View>
  );
}