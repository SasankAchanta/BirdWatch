import React, { useState } from 'react';
import { 
  ImageBackground, 
  View, 
  TextInput, 
  Pressable, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  TouchableWithoutFeedback, 
  Keyboard,
  ActivityIndicator, 
  StyleSheet       
} from 'react-native';
import Style from './Style.js';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Signup } from "./api.js";

const TextInputExample = () => {

  const router = useRouter();
  
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [username, onChangeUsername] = useState('');

  // State variables for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const InputsFilled = email.length > 0 && password.length > 0 && username.length > 0;

  //calls sign up endpoint and save token
  const HandleSignup = async () => {
    try {
      setIsLoading(true);   // Show the loading wheel
      setErrorMessage('');  // Clear any old error messages

      const res = await Signup(email, password, username);
      
      console.log(res);

      const token = res.token;
      await AsyncStorage.setItem("token", token);
    
      // go to home page
      setIsLoading(false);
      router.replace('/HomePage');
      console.log("move pages");
    } catch (err) {
      console.log(err.response?.data || err.message);
      setIsLoading(false); // Hide the loading wheel

      // ✅ GRAB THE EXACT BACKEND ERROR HERE:
      // Added `.detail` as the very first thing to check!
      const backendErr = err.response?.data?.detail 
                      || err.response?.data?.error 
                      || err.response?.data?.message 
                      || (typeof err.response?.data === 'string' ? err.response?.data : null)
                      || err.message 
                      || "Failed";
      
      // Set the error message to the exact string your backend returned
      setErrorMessage(String(backendErr)); 
    }
  };

  return (
    // Wrap EVERYTHING in a master View so the overlay can escape the Keyboard view constraints
    <View style={{ flex: 1 }}>
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
                  secureTextEntry // Usually a good idea for passwords!
                />

                {/* Show the exact backend error message if there is an error */}
                {errorMessage ? (
                  <Text style={{ color: '#A88D79', textAlign: 'center', marginTop: -15, fontSize: 18, fontFamily: 'LondrinaSolid-regular' }}>
                    {errorMessage}
                  </Text>
                ) : null}
              </View>

            </ImageBackground>
          </ScrollView>
          
          {/* Disabled during loading so users can't spam the button */}
          <Pressable disabled={!InputsFilled || isLoading} style={Style.enter} onPress={HandleSignup}>
            <Text style={Style.buttonTxt1}> Enter </Text>
          </Pressable>
        
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* MOVED LOADING OVERLAY HERE: Completely outside the other wrappers so it cannot be hidden */}
      {isLoading && (
        <View style={localStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#E8D5A3" />
        </View>
      )}

    </View>
  );
};

// Local styles just for the loading overlay
const localStyles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent dark background
    zIndex: 999,
    elevation: 10 // Added elevation to force it to the top layer on Android devices
  }
});

export default TextInputExample;