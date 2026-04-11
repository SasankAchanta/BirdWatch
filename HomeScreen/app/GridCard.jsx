import barnOwl from './birdpics/barn owl.png';
import { View, Image, Text, Button, Pressable, KeyboardAvoidingViewComponent } from 'react-native';
import Style from './Style.js';
import ReadMore from './ReadMore.js';

import { useRouter, usePathname } from 'expo-router';

let knownbird = false;


function GridCard({ BirdPic, Birdname}) {
  knownbird = true;
  if(Birdname === "Unknown Bird"){
    knownbird = false;
  }
  const router = useRouter();
  const pathname = usePathname();
    return ( 
    
    //button to open read more page, displayes bird name and image
    <Pressable disabled={!knownbird} style={Style.readMore} onPress={() => router.replace('/ReadMore')}>
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