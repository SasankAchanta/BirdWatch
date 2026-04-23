import { ImageBackground, View, Image, Text, Pressable, ScrollView} from 'react-native';
import Style from './Style.js';

import { useRouter } from 'expo-router';

//need all this info to make a read more page
function Read({ BirdPic, PopuationPic, Info, Map, Birdname, ScientificName, Facts}) {
  const router = useRouter();
    return ( 
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/96/be/5d/96be5d6ff03c61316b42e6a07a46ab90.jpg' }} style={Style.flex1}>
      <View style={{ flex: 1, backgroundColor: "#0a0d04a0" }}>
    <ScrollView>
    <View style={Style.PicWinfo}> 
            <Image source={{uri: BirdPic}} style={{ width: 170, height: 160, alignSelf: 'left', left: 15, top:60, borderRadius:20, borderWidth: 3, borderColor: '#F6E2BE'}}></Image>
            <View style={{ width: 250, height: 170, left:145, top: 75, backgroundColor: '#2F3820', borderRadius: 20, justifyContent:'center', borderWidth: 3, borderColor: '#F6E2BE'}}>
               <Image source={{uri: Map}} style={{ width: 170, height: 160, alignSelf: 'center', padding: 5, borderRadius:20}}></Image>
            </View>      
        </View>
        <View style={Style.OtherInfo}> 
            <Pressable style={{width: 75, height: 50, justifyContent: 'center', top: 250, alignSelf:'left', right: 150, backgroundColor: '#2F3820', borderRadius: 20, borderWidth: 3, borderColor: '#F6E2BE'}} onPress={() => router.replace('/Grid')} >
              <Text style={{color:"#F6E2BE", fontFamily: 'LondrinaSolid-regular', fontSize: 20, textAlign: 'center', justifyContent:'center' }}>Back</Text>
              </Pressable>  
            <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: 45, textAlign:'center', color:'#F6E2BE'}}>
                    {Birdname}</Text>
            <Image source={Map} style={{ width: 180, height: 180, alignSelf: 'center', top: 40, padding: 5, borderRadius:20}}></Image>  
                      
        </View>
        <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: 17, textAlign:'center', color:'#ffffff', top: -320, padding:10,}}>
            {Info}
            </Text>
            <Pressable style={{width: 160, height: 60, justifyContent: 'center', bottom: 250, alignSelf:'center', backgroundColor: '#2F3820', borderRadius: 20, borderWidth: 3, borderColor: '#F6E2BE'}} onPress={() => router.replace('/Grid')} >
              <Text style={{color:"#F6E2BE", fontFamily: 'LondrinaSolid-regular', fontSize: 20, textAlign: 'center', justifyContent:'center' }}>READ ON WIKIPEDIA</Text>
              </Pressable>  
    </ScrollView>
    </View>
    </ImageBackground>
  );
}
//WIKIPEDIA LINKING REQUIRED
export default Read;