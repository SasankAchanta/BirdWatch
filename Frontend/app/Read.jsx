import { ImageBackground, View, Image, Text, Pressable, ScrollView} from 'react-native';
import Style from './Style.js';



import { useRouter } from 'expo-router';
import { WebView } from "react-native-webview";

//need all this info to make a read more page
function Read({ BirdPic, Info, Map, Birdname}) {
  const router = useRouter();
    return ( 
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/96/be/5d/96be5d6ff03c61316b42e6a07a46ab90.jpg' }} style={Style.flex1}>
      <View style={{ flex: 1, backgroundColor: "#0a0d04a0" }}>
    <ScrollView>
    <View style={Style.PicWinfo}> 
            <Image source={{uri: BirdPic}} style={{ width: 170, height: 160, alignSelf: 'left', left: 15, top:60, borderRadius:20, borderWidth: 3, borderColor: '#F6E2BE'}}></Image>
            <View style={{ width: 250, height: 170, left:145, top: 75, backgroundColor: '#2F3820', borderRadius: 20, justifyContent:'center', borderWidth: 3, borderColor: '#F6E2BE'}}>
              <View style={{ width: '80%', height: '80%', overflow: 'hidden', alignSelf:'center', borderRadius:20, resizeMode:'cover'}}>
                <WebView source={{uri: Map}} style={{ flex: 1 }} scrollEnabled={false}></WebView>
              </View>
            </View>      
        </View>
        <View style={Style.OtherInfo}> 
            <Pressable style={{width: 75, height: 50, justifyContent: 'center', top: 250, alignSelf:'left', right: 150, backgroundColor: '#2F3820', borderRadius: 20, borderWidth: 3, borderColor: '#F6E2BE'}} onPress={() => router.replace('/Grid')} >
              <Text style={{color:"#F6E2BE", fontFamily: 'LondrinaSolid-regular', fontSize: 20, textAlign: 'center', justifyContent:'center' }}>Back</Text>
              </Pressable>  
            <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: 45, textAlign:'center', color:'#F6E2BE'}}>
                    {Birdname}</Text>
                      
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