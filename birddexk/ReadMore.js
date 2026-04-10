import React from "react";
import { Image, View, Text, Button, Pressable } from 'react-native';
import {useState} from 'react';
import Style from './Style.js';


//blank page
function ReadMore({newPage}){
    return(
    <View> 
        <Button title="ABack" onPress={() => newPage('Scroll')}></Button>    
    </View>
    );
}
export default ReadMore;