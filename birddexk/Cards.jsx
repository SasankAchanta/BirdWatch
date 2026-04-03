import {useState} from 'react';
import { Image, View, Text, Button, Pressable } from 'react-native';
import Style from './Style.js';


function BirdCard({ BirdPic, Birdname, info, Rarity, position, newPage }) {
  //empty style object
  let style = {};
  
  return (
    //Bird card creator
    <View style={[Style.birdCard, style]}>
      
      <View style={[Style.top,style]}>
        <Image source={BirdPic} style={[Style.Birdpic, style]}/>
        <View style={[Style.TitleBox, style]}>
          <Text style={[Style.cardTitle, style]}>{'\n'}{Birdname}{'\n\n'}
          <Text>Rarity:</Text> {Rarity}</Text>
        </View>  
      </View>

      <View style={[Style.infoBox, style]}>
        <Text style={[Style.info, style]}>{info}</Text>
        <Button title="Read More" style={[Style.readMore, style]} onPress={() => newPage('Grid')} />
      </View>
      
    </View>
  ); 
}

export default BirdCard;