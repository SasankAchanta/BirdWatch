import React from "react";
import {useState} from 'react';
import { Image, View, Text, Button, Pressable } from 'react-native';
import Scroll from "./Scroll.js";
import Styles from "./Style.js";
import Grid from "./Grid.js";
import { useFonts, LondrinaSolid_400Regular, LondrinaSolid_900Black } from '@expo-google-fonts/londrina-solid';

function App() {
  //imported font
  const [fontsLoaded] = useFonts({
    'LondrinaSolid-Regular': LondrinaSolid_400Regular,
    'LondrinaSolid-Bold': LondrinaSolid_900Black,
  });
  //return is fonts arent loaded
  if(!fontsLoaded){
  return null;
  }

  //original page set to scroll
  const [page, NPage] = useState('Scroll');

  //checks page and sents new page component to script
  return (
    <View style={Styles.body}>
      {page === 'Scroll' && <Scroll newPage={NPage}/>}
      {page === 'Grid' && <Grid newPage={NPage}/>}
    </View>
  );
}

export default App;