import React, { useState } from 'react';
import {ImageBackground,View,TextInput,Pressable,Text, KeyboardAvoidingView,Platform,ScrollView,TouchableWithoutFeedback,Keyboard,
  ActivityIndicator,StyleSheet} from 'react-native';
import Style from './Style.js';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Login } from "./api.js";

//endpoint connected
const TextInputExample = () => {
  
  const router = useRouter();

  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  // New state variables for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const InputsFilled = email.length > 0 && password.length > 0;

  //calls login endpoint and saves token
  const handleLogin = async () => {
    try {
      setIsLoading(true);   // Show the loading wheel
      setErrorMessage('');  // Clear any old error messages

      const res = await Login(email, password);

      console.log(res);

      const token = res.token;
      await AsyncStorage.setItem("token", token);
      
      // go to home page (if passed, do nothing else)
      setIsLoading(false);
      router.replace('/HomePage');
    } catch (err) {
      console.log(err.response?.data || err.message);
      setIsLoading(false);        // Hide the loading wheel
      setErrorMessage('Invalid credentials');  // Set the output to failed
    }
  };
  
  //test login - can login with anything
  function testlogin(){
    router.replace('/HomePage');
  }

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
              
              {errorMessage ? (
                <Text style={{ color: '#A88D79', textAlign: 'center', marginTop: -15, fontSize: 18, fontFamily: 'LondrinaSolid-regular' }}>
                  {errorMessage}
                </Text>
              ) : null}

            </View>
          </ImageBackground>
        </ScrollView>

        <Pressable disabled={!InputsFilled || isLoading} style={Style.enter} onPress={handleLogin}>
          <Text style={Style.buttonTxt1}> Enter </Text>
        </Pressable>

        {isLoading && (
          <View style={localStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#E8D5A3" />
          </View>
        )}

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// Local styles just for the loading overlay
const localStyles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent dark background
    zIndex: 999
  }
});

export default TextInputExample;