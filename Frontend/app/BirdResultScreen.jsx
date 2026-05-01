import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const getRarityColor = (rarity) => {
  const colors = {
    'Common': '#366a49',
    'Uncommon': '#2d5a8e',
    'Rare': '#8e44ad',
    'Mythic': '#d35400',
    'Legendary': '#f1c40f',
  };
  return colors[rarity] || '#366a49';
};

export default function BirdResultScreen({ visible, birdData, onClose }) {
  const router = useRouter();
  const activeRarityColor = getRarityColor(birdData?.rarity);

  const handleAddAndNavigate = async () => {

    /* 
      backend POST request to add bird to user inventory would go here. It then sends them to the birddex screen 
    */
    

    onClose();
    router.replace('/Inventory'); 
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ImageBackground 
            source={{ uri: 'https://i.pinimg.com/1200x/db/bc/1a/dbbc1adc84da2b144430f92b6651bc23.jpg' }} 
            style={styles.backgroundImage}
            imageStyle={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          >
            <View style={styles.innerPadding}>

              <Text style={styles.birdName}>{birdData?.name || "BIRD NAME"}</Text>
              
              <Text style={styles.scientificName}>{birdData?.scientific_name || "Scientific Name"}</Text>

              <View style={styles.imageContainer}>

                <Image 
                  source={{ uri: birdData?.uri || 'https://via.placeholder.com/300' }} 
                  style={styles.birdImage} 
                />
                
                <View style={[styles.rarityBadge, { backgroundColor: activeRarityColor }]}>
                  <Text style={styles.rarityText}>{birdData?.rarity?.toUpperCase() || "COMMON"}</Text>
                </View>
              </View>

              <Text style={styles.pointsText}>+{birdData?.added_points || 0} POINTS</Text>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleAddAndNavigate}>
                <Text style={styles.btnText}>ADD TO BIRDDEX</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { width: width, height: height * 0.825, backgroundColor: 'transparent', borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: 'hidden' },
  backgroundImage: { flex: 1, width: '100%' },
  innerPadding: { flex: 1, padding: 30, alignItems: 'center' },
  handle: { width: 50, height: 5, backgroundColor: 'rgba(233, 209, 166, 0.5)', borderRadius: 10, marginBottom: 20 },
  birdName: { fontSize: 40, color: '#E9D1A6', fontFamily: 'LondrinaSolid', textAlign: 'center', textTransform: 'uppercase' },
  scientificName: { fontSize: 22, color: '#E9D1A6', fontFamily: 'serif', fontStyle: 'italic', marginBottom: 20, opacity: 0.8 },
  imageContainer: { width: '100%', height: '50%', borderRadius: 30, overflow: 'hidden', backgroundColor: '#000', marginBottom: 'auto' },
  birdImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  rarityBadge: { position: 'absolute', top: 15, left: 15, paddingVertical: 6, paddingHorizontal: 15, borderRadius: 12 },
  rarityText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  pointsText: { color: '#fcbd00', fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  primaryBtn: { width: '100%', backgroundColor: '#435742', paddingVertical: 20, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
  btnText: { color: '#E9D1A6', fontSize: 22, fontWeight: 'bold' },
});