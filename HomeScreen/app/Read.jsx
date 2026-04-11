import barnOwl from './birdpics/barn owl.png';
import { View, Image, Text, Button, Pressable, KeyboardAvoidingViewComponent } from 'react-native';
import Style from './Style.js';
import ReadMore from './ReadMore.js';

import { useRouter, usePathname } from 'expo-router';

let knownbird = false;


function Read({ BirdPic, PopuationPic, Info, Map, Birdname, ScientificName, Facts}) {
  knownbird = true;
  if(Birdname === "Unknown Bird"){
    knownbird = false;
  }
  const router = useRouter();
  const pathname = usePathname();
    return ( 
    <View>
    <View style={Style.PicWinfo}> 
            <Image source={BirdPic} style={{ width: 180, height: 160, alignSelf: 'center', top: 60, padding: 5, borderRadius:20}}></Image>
            <View style={{ width: 170, height: 170, alignSelf: 'center', top: 75, backgroundColor: '#F6E2BE', padding: 5, borderRadius: 20,justifyContent:'center'}}>
                <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: '15', textAlign:'left', color:'#9B8254', marginLeft: 20}}>
                    {Facts} 
                     </Text>
            </View>      
        </View>
        <View style={Style.OtherInfo}> 
            <Pressable style={{width: 50, height: 25, alignSelf:'center',backgroundColor: '#F6E2BE', borderRadius: 20,}}title="Back" onPress={() => router.replace('/Grid')} ></Pressable>  
            <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: '25', textAlign:'center', color:'#ffffff', top: 10}}>
                    {Birdname}{"\n"}{ScientificName} </Text>
            <Image source={PopuationPic} style={{ width: 190, height: 60, alignSelf: 'center', top: 30, padding: 5, borderRadius:20, backgroundColor:'#F6E2BE'}}></Image>
            <Image source={Map} style={{ width: 180, height: 180, alignSelf: 'center', top: 40, padding: 5, borderRadius:20}}></Image>  
                      
        </View>
        <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: '13', textAlign:'center', color:'#ffffff', top: -320, padding:10,}}>
            {Info}
            </Text>
    </View>
  );
}

export default Read;