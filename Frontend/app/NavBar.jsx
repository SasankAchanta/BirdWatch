import React from 'react';
import { View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const NavButton = ({ index, isSelected, onPress, iconSource }) => (
  
  <TouchableOpacity
    onPress={onPress}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Image source={iconSource} style={{
      padding:15,
      borderRadius:27,
      width: isSelected ? 65:60, 
      height: isSelected ? 65:60,
      tintColor:'#2F3820',
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
      alignSelf:'center',
      borderRadius:37,
      bottom: 15,
      width: '90%',
      height: 70,
      backgroundColor: '#8e9569d2',
      justifyContent: 'center',

      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.7,
      shadowRadius: 10,
    }}>
      <View 
      style={{
        position: 'absolute',
        left: .9*((page * tabWidth) + (tabWidth / 2)-30),
        width: 55,
        height: 55,
        borderRadius: 47,
        backgroundColor: '#f0ebbed4',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 10,        
      }} />
      <View style={{ flexDirection: 'row', width: '100%', height: '100%', zIndex: 2 }}>
        <NavButton 
          index={0} 
          isSelected={page === 0} 
          onPress={() => { if (pathname !== '/HomePage') router.replace('/HomePage') }}
          iconSource={require('./icons/1house.png')} 
        />
        <NavButton 
          index={1} 
          isSelected={page === 1} 
          onPress={() => { if (pathname !== '/Camera') router.replace('/Camera') }} 
          iconSource={require('./icons/Camera(1).png')}
        />
        <NavButton 
          index={2} 
          isSelected={page === 2} 
          onPress={() => { if (pathname !== '/Inventory') router.replace('/Inventory') }} 
          iconSource={require('./icons/cards.png')}
        />
        <NavButton 
          index={3} 
          isSelected={page === 3} 
          onPress={() => { if (pathname !== '/Profile') router.replace('/Profile') }}
          iconSource={require('./icons/profile.png')}
        />
      </View>
    </View>
  );
}