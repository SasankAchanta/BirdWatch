import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const ScreenW =width;
const ScreenH = height;


const styles = StyleSheet.create({
  body: {
    backgroundColor: '#2F3820',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },


  gridButton: {
    display: 'flex',
    top: -350,
    width: 50,
    height: 30,
    backgroundColor: '#C5AD82',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Grid:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width,
    padding: 7,
    marginTop: 100,
  },
  GridCard: {
    display: 'flex',
    width: 175, 
    height: 200, 
    backgroundColor: '#E9D1A6', 
    borderRadius: 20,
  },
  GridImg: {
    display: 'flex',
    alignSelf: 'center',
    padding:7,
    marginTop: 10,
    width: 140,
    height: 130,
    borderRadius: 15,
  },
  GridName: {
    marginTop: -10,
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 20,
    textAlign: 'center',
  },

  cardscreen:{
    width: ScreenW,
    height: ScreenH,
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
  },


  CardContainer: {
    width: ScreenW * 0.9,
    height: 560,
    top: (ScreenH * 0.6)/3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  birdCard: {
    position: 'absolute', // moved here from inline
    backgroundColor: '#E9D1A6',
    borderRadius: 30,
    width: ScreenW * 0.9,    // fixed width so absolute positioning centers correctly
    height: 460,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Birdpic: {
    height: 128,
    width: 128,
    borderRadius: 25,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 30,
  },
  TitleBox: {
    alignSelf: 'flex-end',
    backgroundColor: '#F6E2BE',
    borderRadius: 20,
    height: 128,
    width: 160,
  },
  cardTitle: {
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 18,
    textAlign: 'center',
  },
  infoBox: {
    flex: 0.95,
    width: ScreenW * 0.9 - 40, // respects padding (padding is 20 on each side)
    borderRadius: 20,
    backgroundColor: '#F6E2BE',
    alignItems: 'center',
  },
  info: {
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  readMore: {
    fontFamily: 'LondrinaSolid-regular',
    padding: 10,
    alignSelf: 'center',
  },

  
});

export default styles;