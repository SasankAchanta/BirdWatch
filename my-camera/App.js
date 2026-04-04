import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [burstPhotos, setBurstPhotos] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [flash, setFlash] = useState('off');
  const [zoom, setZoom] = useState(0); 
  const cameraRef = useRef(null);
  
  const prevPinchDist = useRef(null);

  useEffect(() => {
    if (permission && !permission.granted) requestPermission();
  }, [permission, requestPermission]);

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

  if (!permission?.granted) return <View style={styles.container} />;

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
                {burstPhotos.length > 0 && (
                  <TouchableOpacity style={styles.stackPos} onPress={() => setIsReviewing(true)}>
                    {burstPhotos.slice(0, 3).map((uri, i) => (
                      <View key={i} style={[styles.stackFrame, { transform: [{ rotate: `${i * 3}deg` }], marginTop: i > 0 ? -56 : 0 }]}>
                        <Image source={{ uri }} style={styles.flex1} />
                      </View>
                    ))}
                    <View style={styles.badge}><Text style={styles.badgeText}>{burstPhotos.length}</Text></View>
                  </TouchableOpacity>
                )}
              </CameraView>
            </View>
            <View style={styles.bottomBar}>
              <TouchableOpacity onPress={pickImage}><MaterialIcons name="photo-library" size={30} color="white" /></TouchableOpacity>
              <TouchableOpacity style={styles.shutterOut} onPress={takePhoto}><View style={styles.shutterIn} /></TouchableOpacity>
              <View style={{ width: 30 }} /> 
            </View>
          </View>
        ) : (
          <View style={styles.flex1}> 
            {/* Header with Back Arrow */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backBtn} 
                onPress={() => { isReviewing ? setIsReviewing(false) : setSelectedPhoto(null); }}
              >
                <MaterialIcons name="chevron-left" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{isReviewing ? "Select Bird" : "Confirm Photo"}</Text>
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
                <TouchableOpacity style={styles.actionBtn}><Text style={styles.btnText}>Identify Bird</Text></TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  flex1: { flex: 1, width: '100%', height: '100%'},
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }, 
  camWrapper: { width: 375, height: 760, marginBottom: 50, marginHorizontal: 10, borderRadius: 20, overflow: 'hidden', backgroundColor: '#000', alignSelf: 'center' },
  flashBtn: { position: 'absolute', top: 20, right: 20 },
  zoomIndicator: { position: 'absolute', top: 20, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 15, paddingHorizontal: 12, paddingVertical: 4 },
  zoomText: { color: 'white', fontWeight: 'bold' },
  viewfinder: { width: 220, height: 220, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', borderRadius: 40, alignSelf: 'center', marginTop: '50%' },
  stackPos: { position: 'absolute', right: 20, bottom: 20, width: 65, alignItems: 'center' },
  stackFrame: { width: 60, height: 60, borderRadius: 12, borderWidth: 2, borderColor: 'white', backgroundColor: '#000', overflow: 'hidden' },
  badge: { position: 'absolute', top: -10, right: -10, backgroundColor: '#4CAF50', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  bottomBar: { position: 'absolute', bottom: 30, flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' },
  shutterOut: { width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  shutterIn: { width: 64, height: 64, backgroundColor: 'white', borderRadius: 32 },
  
  // FIXED HEADER STYLES
  header: { 
    height: 100,
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10,
    marginTop: 20,
    zIndex: 10
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginLeft: 5, 
    fontFamily: 'serif',
  },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, paddingBottom: 100 },
  gridCard: { width: (width - 40) / 2, height: (width - 40) / 2, margin: 5, borderRadius: 15, overflow: 'hidden' },
  finalBox: { flex: 1, padding: 20, justifyContent: 'center', paddingBottom: 100 },
  finalImg: { width: '100%', height: '60%', borderRadius: 20, marginBottom: 30 },
  actionBtn: { paddingVertical: 18, borderRadius: 12, alignItems: 'center', backgroundColor: '#4CAF50' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});