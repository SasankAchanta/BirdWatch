import barnOwl from './birdpics/barn owl.png';
import { View, Image, Text, Button, Pressable } from 'react-native';
import Style from './Style.js';
import ReadMore from './ReadMore.js';



function GridCard({ BirdPic, Birdname, newPage}) {
    return ( 
    
    //button to open read more page, displayes bird name and image
    <Pressable style={Style.readMore} onPress={() => newPage('ReadMore')}>
      <View style={Style.GridCard}>
        <Image source={BirdPic} style={Style.GridImg} />
          <Text style={Style.GridName}>
            {'\n'}{Birdname}{'\n\n'}
          </Text>
    </View>
    </Pressable>
  );
}

export default GridCard;