import React from "react";
import { Image, View, Text, Pressable } from 'react-native';
import Style from './Style.js';

import { useRouter, usePathname } from 'expo-router';



//blank page
function ReadMore(){
    const router = useRouter();
    const pathname = usePathname();
  

    return(
    <View style={{flex:1}}>
        <View style={Style.PicWinfo}> 
            <Image source={require('./birdpics/american goldfinch.png')} style={{ width: 180, height: 160, alignSelf: 'center', top: 60, padding: 5, borderRadius:20}}></Image>
            <View  style={{ width: 170, height: 170, alignSelf: 'center', top: 75, backgroundColor: '#F6E2BE', padding: 5, borderRadius: 20,justifyContent:'center'}}>
                <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: '15', textAlign:'left', color:'#9B8254', marginLeft: 20}}>
                    Kingdom: Animalia{"\n"}Phylum: Chordata{"\n"}Class: Aves{"\n"}Order: Passeriformes{"\n"}Family: Fringillidae{"\n"}Subfamily: Carduelinae{"\n"}Genus: Spinus{"\n"}Species: S. tristis 
                     </Text>
            </View>      
        </View>
        <View style={Style.OtherInfo}> 
            <Pressable style={{width: 50, height: 25, alignSelf:'center',backgroundColor: '#F6E2BE', borderRadius: 20,}}title="Back" onPress={() => router.replace('/Grid')} ></Pressable>  
            <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: '25', textAlign:'center', color:'#ffffff', top: 10}}>
                    American GoldFinch{"\n"}Spinus tristis </Text>
            <Image source={require('./birdpics/status.png')} style={{ width: 190, height: 60, alignSelf: 'center', top: 30, padding: 5, borderRadius:20, backgroundColor:'#F6E2BE'}}></Image>
            <Image source={require('./birdpics/area.png')} style={{ width: 180, height: 180, alignSelf: 'center', top: 40, padding: 5, borderRadius:20}}></Image>  
                      
        </View>
        <Text style = {{fontFamily: 'LondrinaSolid-regular', fontSize: '13', textAlign:'center', color:'#ffffff', top: -320, padding:10,}}>
            The American goldfinch (Spinus tristis) is a small North American bird in the finch family. It is migratory, ranging from mid-Alberta to North Carolina during the breeding season, and from just south of the Canada-United States border to Mexico during the winter.
            The only finch in its subfamily to undergo a complete molt, the American goldfinch displays sexual dichromatism: the male is a vibrant yellow in the summer and an olive color during the winter, while the female is a dull yellow-brown shade  which brightens only slightly during the summer. The male displays  brightly colored plumage during the breeding season to attract a mate.
            The American goldfinch is a granivore and adapted for the consumption of seedheads, with a conical beak to remove the seeds and agile feet to grip the stems of seedheads while feeding. It is a social bird and will gather in large flocks while  feeding and migrating. It may behave territorially during nest construction, but this aggression is short-lived. Its  breeding season is tied to the peak of food supply, beginning in late  July, which is relatively late in the year for a finch. This species is  generally monogamous and produces one brood each year.
            Human activity has generally benefited the American goldfinch. It is often found in residential areas because it is attracted to bird feeders, which increase its survival rate in these areas. Deforestation also creates open meadow areas, which are its preferred habitat.
            {"\n"}{"\n"}READ MORE ON WIKIPEDIA
            </Text>

    </View>
    
    );
}
export default ReadMore;
//back button
// <Button title="ABack" onPress={() => router.replace('/Grid')} ></Button>  