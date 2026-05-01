import { useRef, useEffect } from 'react';
import { View, Text, Image, Pressable, Animated } from 'react-native';
import Style from './Style.js';

import { useRouter, usePathname } from 'expo-router';


//give the y value to move based on index
const getY = (pos) => {
  if (pos === 0) {
    return 0;
  }
  else if (pos === -1) {
    return -80;
  }
  else if (pos === 1) {
    return 80;
  }
  else if (pos === -2) {
    return -130;
  }
  else if (pos === 2) {
    return 130;
  }
  //if more than 2 indexs away dont do anything
  return 0.1;
};

//give value to scale by based on index
const getScale = (pos) => {
  if (pos === 0) {
    return 0.9;
  }
  if (Math.abs(pos) === 1) {
    return 0.8;
  }
  if (Math.abs(pos) === 2) {
    return 0.7;
  }
  //if more than 2 indexs away  do nothing
  return 0.1;
};

//gives color based on index
const getColor = (pos) => {
  if (pos === 0) {
    return "#E9D1A6";
  }
  //same color for -1 and 1
  else if (Math.abs(pos) === 1) {
    return "#C5AD82";
  }
  else {
    return "#AF976C";
  }
};

//gives zIndex based on index for card stacking
const getZIndex = (pos) => {
  if (pos === 0) {
    return 3;
  }
  else if (pos === -1) {
    return 2;
  }
  else if (pos === 1) {
    return 1;
  }
  else {
    return 0;
  }
};

function BirdCard({ idx, BirdPic, Birdname, info, Rarity, position }) {
  const router = useRouter();
  const pathname = usePathname();

  //initialized animation values for cards
  const animY = useRef(new Animated.Value(getY(position))).current;
  const animScale = useRef(new Animated.Value(getScale(position))).current;

  // Run every time position changes
  useEffect(() => {
    Animated.spring(animY, {
      //new position value
      toValue: getY(position),
      useNativeDriver: true,
    }).start();
    Animated.spring(animScale, {
      // new scale based on index
      toValue: getScale(position),
      useNativeDriver: true,
    }).start();
  }, [position]);

  //used to disable read more button for unknown birds
  let knownbird = Birdname
  if (knownbird === "Loading...") {
    knownbird = false;
  }
  else {
    knownbird = true;
  }

  return (
    //Animated.View used for transforms
    <Animated.View style={[
      Style.birdCard,
      {
        zIndex: getZIndex(position),
        backgroundColor: getColor(position),
        transform: [{ translateY: animY }, { scale: animScale }],
      }
    ]}>
      <View style={Style.top}>
        <Image source={{ uri: BirdPic }} style={Style.Birdpic} />
        <View style={Style.TitleBox}>
          <Text style={Style.cardTitle}>
            {'\n'}{Birdname}{'\n\n'}Rarity: {Rarity}
          </Text>
        </View>
      </View>

      <View style={Style.infoBox}>
        <Text style={Style.info}>{info}</Text>
        {knownbird && (
          <Pressable style={Style.readMore} onPress={() => router.push({ pathname: '/ReadMore', params: { name: Birdname } })}>
            <Text>Read More</Text>
          </Pressable>
        )}
      </View>

    </Animated.View>
  );
}

export default BirdCard;