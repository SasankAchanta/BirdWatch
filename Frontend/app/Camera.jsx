import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, Dimensions, ImageBackground, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'; 
import { uploadPhoto } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused(); 
  const [burstPhotos, setBurstPhotos] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [flash, setFlash] = useState('off');
  const [zoom, setZoom] = useState(0); 
  const cameraRef = useRef(null);
  const prevPinchDist = useRef(null);

  //gets location function
  const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    alert("Location permission not granted");
    return null;
  }
  //get location and save cords
  let loc = await Location.getCurrentPositionAsync({});
  return {
    lat: loc.coords.latitude,
    lng: loc.coords.longitude,
  };
};

  useEffect(() => {
    if (isFocused && permission && !permission.granted) requestPermission();
  }, [isFocused, permission]);

  const getDistance = (touches) => {
    const [t1, t2] = touches;
    return Math.sqrt(Math.pow(t2.pageX - t1.pageX, 2) + Math.pow(t2.pageY - t1.pageY, 2));
  };

  const handleTouchMove = (event) => {
    const touches = event.nativeEvent.touches;
    if (touches.length === 2) {
      const currentDist = getDistance(touches);
      if (prevPinchDist.current !== null) {
        const delta = currentDist - prevPinchDist.current;
        let newZoom = zoom + delta * 0.002; 
        setZoom(Math.min(Math.max(newZoom, 0), 1));
      }
      prevPinchDist.current = currentDist;
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setBurstPhotos([data.uri, ...burstPhotos]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1] });
    if (!result.canceled) {
      setSelectedPhoto(result.assets[0].uri);
      setIsReviewing(false);
    }
  };

  const handleIdentify = async () => {
  try {
    //get location and token
    const location = await getLocation();
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      alert("Not logged in");
      return;
    }

    //upload photo with upload endpoint
    const result = await uploadPhoto(
      selectedPhoto,
      location?.lat || 0,
      location?.lng || 0,
      token
    );
    //alert with bird name else fail
    alert(`Bird: ${result.bird}`);
  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Upload failed");
  }
};

  const handleBackPress = () => {
    if (selectedPhoto) {
      setSelectedPhoto(null);
      setIsReviewing(true);
    } else {
      setIsReviewing(false);
    }
  };

  if (!permission?.granted) return <View style={styles.container} />;
  if (!isFocused) return <View style={styles.container} />;

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/96/be/5d/96be5d6ff03c61316b42e6a07a46ab90.jpg' }} 
      style={styles.flex1}
    >
      <SafeAreaView style={styles.overlay}>
        {(!isReviewing && !selectedPhoto) ? (
          <View style={styles.flex1}>
            <View 
              style={styles.camWrapper}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderMove={handleTouchMove}
              onResponderRelease={() => { prevPinchDist.current = null; }}
            >
              <CameraView style={styles.flex1} ref={cameraRef} flash={flash} zoom={zoom}>
                <TouchableOpacity style={styles.flashBtn} onPress={() => setFlash(f => f === 'off' ? 'on' : 'off')}>
                  <MaterialIcons name={flash === 'on' ? 'flash-on' : 'flash-off'} size={24} color={flash === 'on' ? '#FFD700' : 'white'} />
                </TouchableOpacity>
                <View style={styles.viewfinder} />
                <View style={styles.zoomIndicator}>
                  <Text style={styles.zoomText}>{Math.round(zoom * 10 + 1)}x</Text>
                </View>
              </CameraView>
            </View>

            <View style={styles.bottomBar}>
              <TouchableOpacity style={styles.sideBtn} onPress={pickImage}>
                <MaterialIcons name="photo-library" size={32} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.shutterOut} onPress={takePhoto}>
                <View style={styles.shutterIn} />
              </TouchableOpacity>
              
              <View style={styles.sideBtn}>
                {burstPhotos.length > 0 && (
                  <TouchableOpacity style={styles.stackContainer} onPress={() => setIsReviewing(true)}>
                    {burstPhotos.slice(0, 3).reverse().map((uri, i) => (
                      <View key={i} style={[styles.stackFrame, { transform: [{ rotate: `${i * 3}deg` }], marginTop: i > 0 ? -74 : 0 }]}>
                        <Image source={{ uri }} style={styles.flex1} />
                      </View>
                    ))}
                    <View style={styles.badge}><Text style={styles.badgeText}>{burstPhotos.length}</Text></View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.flex1}> 
            <View style={styles.header}>
              <TouchableOpacity style={styles.backBtn} onPress={handleBackPress}>
                <MaterialIcons name="chevron-left" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{isReviewing ? "Select Photo" : "Confirm Bird"}</Text>
            </View>
            
            {isReviewing ? (
              <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
                {burstPhotos.map((uri, i) => (
                  <TouchableOpacity key={i} style={styles.gridCard} onPress={() => { setSelectedPhoto(uri); setIsReviewing(false); }}>
                    <Image source={{ uri }} style={styles.flex1} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.finalBox}>
                <Image source={{ uri: selectedPhoto }} style={styles.finalImg} />
                <TouchableOpacity style={styles.actionBtn} onPress={handleIdentify}>
                  <Text style={styles.btnText}>Identify Bird</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

// CSS styling
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2F3820' },
  flex1: { flex: 1, width: '100%', height: '100%'},
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' }, 
  camWrapper: { width: width * 0.95, height: height * 0.72, marginTop: 10, borderRadius: 30, overflow: 'hidden', backgroundColor: '#000', alignSelf: 'center' },
  flashBtn: { position: 'absolute', top: 20, right: 20 },
  zoomIndicator: { position: 'absolute', top: 20, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 15, paddingHorizontal: 12, paddingVertical: 4 },
  zoomText: { color: 'white', fontWeight: 'bold' },
  viewfinder: { width: 220, height: 220, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', borderRadius: 45, alignSelf: 'center', marginTop: '55%' },
  bottomBar: { flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, paddingBottom: 20 },
  sideBtn: { width: 80, alignItems: 'center', justifyContent: 'center' },
  shutterOut: { width: 85, height: 85, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 45, justifyContent: 'center', alignItems: 'center', top: -10, },
  shutterIn: { width: 68, height: 68, backgroundColor: 'white', borderRadius: 34 },
  stackContainer: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center', top: -10,},
  stackFrame: { width: 75, height: 75, borderRadius: 12, borderWidth: 2, borderColor: 'white', backgroundColor: '#000', overflow: 'hidden' },
  badge: { position: 'absolute', top: -3, right: -7, backgroundColor: '#366a49', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 4, zIndex: 10 },
  badgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  header: { height: 100, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginTop: 10, zIndex: 10 },
  headerTitle: { color: 'white', fontSize: 28, fontWeight: 'bold', marginLeft: 5, fontFamily: 'serif' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, paddingBottom: 100, justifyContent: 'center' },
  gridCard: { width: (width - 40) / 2, height: (width - 40) / 2, margin: 5, borderRadius: 15, overflow: 'hidden'},
  finalBox: { flex: 1, padding: 20, justifyContent: 'center' },
  finalImg: { width: '100%', height: '65%', borderRadius: 25, marginBottom: 30 },
  actionBtn: { paddingVertical: 20, borderRadius: 15, alignItems: 'center', backgroundColor: '#366a49', marginHorizontal: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});