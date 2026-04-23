import React from 'react';
import {ImageBackground, View, TextInput, Pressable, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import Style from './Style.js';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Signup} from "./api.js";

const TextInputExample = () => {


  //calls sign up endpoint and save token
  const HandleSignup = async () => {
    try {
      
      const res = await Signup(email, password, username);
      
      console.log(res);

      const token = res.token;
      await AsyncStorage.setItem("token", token);
    
      // go to home page
      router.replace('/HomePage');
      console.log("move pages");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
    };


  const router = useRouter();
  
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [username, onChangeUsername] = React.useState('');

  const InputsFilled = email.length > 0 && password.length > 0 && username.length > 0;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/96/be/5d/96be5d6ff03c61316b42e6a07a46ab90.jpg' }} style={Style.flex1}>

      <View style={Style.Welcome}>
        <Text style={Style.welcome}> Welcome! </Text>
        <View style={Style.Buttons}>
        <Pressable style={Style.signup} onPress={() => router.replace('/')}>
          <Text style={Style.buttonTxt1}> Login </Text>
        </Pressable>
        <Pressable title="Sign Up" style={Style.Login} onPress={() => router.replace('/SignUp')}>
          <Text style={Style.buttonTxt}> Sign Up </Text>
        </Pressable>
        </View>
      </View>
      <View style={Style.txtboxes}>
        <Text style={Style.nametxt}>Username:</Text>
        <TextInput
          style={Style.input}
          onChangeText={onChangeUsername}
          value={username}
        />
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
        />
        </View>
        </ImageBackground>
        </ScrollView>
        
        <Pressable disabled={!InputsFilled} style={Style.enter} onPress={HandleSignup}>
          <Text style={Style.buttonTxt1}> Enter </Text>
        </Pressable>
      
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
};

export default TextInputExample;