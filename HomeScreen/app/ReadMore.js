import React from "react";
import { Image, View, Text, Button, Pressable } from 'react-native';
import {useState} from 'react';
import Style from './Style.js';
import NavBar from './NavBar.jsx';

import { useRouter, usePathname } from 'expo-router';



//blank page
function ReadMore(){
    const router = useRouter();
    const pathname = usePathname();
  

    return(
    <View style={Style.cardscreen}>
            <NavBar />
    <View> 
        <Button title="ABack" onPress={() => router.replace('/Grid')} ></Button>    
    </View>
    </View>
    );
}
export default ReadMore;