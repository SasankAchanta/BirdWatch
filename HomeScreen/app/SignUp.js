import React from 'react';
import {ImageBackground, View, StyleSheet, TextInput, Pressable, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import Style from './Style.js';
import { useRouter, usePathname } from 'expo-router';


const TextInputExample = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [email, onChangeEmail] = React.useState('');
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const InputsFilled = username.length > 0 && password.length > 0;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
      <View style={Style.txtboxes}>
        <Text style={Style.nametxt}>Email:</Text>
        <TextInput
          style={Style.input}
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={Style.nametxt}>Username:</Text>
        <TextInput
          style={Style.input}
          onChangeText={onChangeUsername}
          value={username}
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
        
        <Pressable disabled={!InputsFilled} style={Style.enter} onPress={() => router.replace('/HomePage')}>
          <Text style={Style.buttonTxt1}> Enter </Text>
        </Pressable>
      
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
};

export default TextInputExample;