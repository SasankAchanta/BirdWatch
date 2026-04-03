import React from "react";
import Scroll from "./Scroll.js";
import { Image, View, Text, Button, Pressable } from 'react-native';
import {useState} from 'react';
import Style from './Style.js';

//blank page
function Grid({newPage}){
    return(
    <View style={Style.body}> 
        <Button title="Back" onPress={() => newPage('Scroll')}></Button>        
    </View>
    );
}
export default Grid;