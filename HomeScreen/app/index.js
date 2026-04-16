import React from 'react';
import {ImageBackground, View, TextInput, Pressable, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Style from './Style.js';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './api.js';


import { Login, setAuthToken } from "./api"; // adjust path if needed



const TextInputExample = () => {
  
  const handleLogin = async () => {
  try {
    const res = await Login(email, password);

    console.log(res);

    
    // go to home page
    router.replace('/HomePage');
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
  };
  function testlogin(){
    router.replace('/HomePage');
  }


  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const InputsFilled = email.length > 0 && password.length > 0;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/96/be/5d/96be5d6ff03c61316b42e6a07a46ab90.jpg' }} style={Style.flex1}>

      <View style={Style.Welcome}>
        <Text style={Style.welcome}> Welcome! </Text>
        <View style={Style.Buttons}>
        <Pressable style={Style.Login} onPress={() => router.replace('/')}>
          <Text style={Style.buttonTxt}>Login </Text>
        </Pressable>
        <Pressable style={Style.signup} onPress={() => router.replace('/SignUp')}>
          <Text style={Style.buttonTxt1}> Sign Up </Text>
        </Pressable>
        </View>
      </View>
      
      <View style={Style.txtboxes}>
        <Text style={Style.nametxt}>Email:</Text>
        <TextInput
          style={Style.input}
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={Style.nametxt}>Password:</Text>
        <TextInput
          style={Style.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry
        />
        </View>
      </ImageBackground>
      </ScrollView>
        <Pressable disabled={!InputsFilled} style={Style.enter} onPress={testlogin}>
          <Text style={Style.buttonTxt1}> Enter </Text>
        </Pressable>
      </KeyboardAvoidingView>
      
      </TouchableWithoutFeedback>
  );
};

export default TextInputExample;