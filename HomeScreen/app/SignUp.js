import React from 'react';
import {ImageBackground, View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
import Style from './Style.js';
import { useRouter, usePathname } from 'expo-router';


const TextInputExample = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [text, onChangeText] = React.useState('  ');

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/96/be/5d/96be5d6ff03c61316b42e6a07a46ab90.jpg' }} style={Style.flex1}>

      <View style={Style.Welcome}>
        <Text style={Style.welcome}> Welcome! </Text>
        <View style={Style.Buttons}>
        <Pressable style={Style.signup}>
          <Text style={Style.buttonTxt1} onPress={() => router.replace('/')}> Login </Text>
        </Pressable>
        <Pressable title="Sign Up" style={Style.Login} onPress={() => router.replace('/SignUp')}>
          <Text style={Style.buttonTxt}> Sign Up </Text>
        </Pressable>
        </View>
      </View>
      
        <TextInput
          style={Style.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={Style.input}
          onChangeText1={onChangeText}
          value1={text}
        />
        <TextInput
          style={Style.input}
          onChangeText1={onChangeText}
          value1={text}
        />
        <Pressable style={Style.enter} onPress={() => router.replace('/HomePage')}>
          <Text style={Style.buttonTxt1}> Enter </Text>
        </Pressable>


      </ImageBackground>
  );
};

export default TextInputExample;