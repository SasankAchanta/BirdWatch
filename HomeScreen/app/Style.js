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

  readmore:{
    width:ScreenW,
    height: ScreenH,
    alignContent: 'center',
    justifyContent:'center',
  },
  nametxt:{
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 35,
    color: '#ffffff',
    alignSelf: 'left',
    left: 35,
    padding: 5,
  },

  flex1: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  txtboxes:{
    marginTop: ScreenH * 0.35,
  },

  PicWinfo:{
    alignSelf:'left',
    width: 230,
    height: 400,
  },
  OtherInfo:{
    alignSelf:'flex-end',
    top:'-350',
    width: 220,
    height: 350,
  },

  input: {  
    textAlign: 'center',
    height: 60,
    borderWidth: 3,
    backgroundColor: '#FDFADF',
    borderRadius: 10,
    borderColor: '#2F3820',
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 20,
    position: "relative",
    marginHorizontal: 35,
    marginBottom: 25,
  },

  Welcome:{
    position:'absolute',
    top:ScreenH * .1,
    width:350,
    height:208,
    backgroundColor: '#C8E1C4',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 14,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },

  welcome:{
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 55,
    textAlign: 'center',
    color: '#7A886A',
  },

  Buttons:{
    flexDirection: 'row', 
    gap: 10,
  },

  Login:{
    height:70,
    width:150,
    backgroundColor: '#7B9477',
    borderRadius: 20,
    justifyContent: 'center',

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },

  buttonTxt:{
    textAlign: 'center',
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 30,
    color: '#ffffff',
  },
  buttonTxt1:{
    textAlign: 'center',
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 30,
    color: '#655F58',
  },

  signup:{
    height:70,
    width:150,
    backgroundColor: '#C0DABC',
    borderRadius: 20,
    justifyContent: 'center',
  },

  enter:{
    position: 'absolute', 
    bottom: ScreenH *.1, 
    alignSelf: 'center',
    height:70,
    width:130,
    backgroundColor: '#C0DABC',
    borderRadius: 20,
    justifyContent: 'center',
    
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
 

  gridButton: {
    display: 'flex',
    top: -350,
    width: 70,
    height: 40,
    backgroundColor: '#C5AD82',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#D2A167',
  },
  Grid:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: ScreenW,
    padding: 7,
    marginTop: 100,
  },
  GridCard: {
    display: 'flex',
    width: 175, 
    height: 200, 
    backgroundColor: '#E9D1A6', 
    borderRadius: 20,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
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
    color:'#9B8254',
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
    position: 'absolute',
    backgroundColor: '#E9D1A6',
    borderRadius: 30,
    width: ScreenW * 0.9,
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
    width: ScreenW * 0.9 - 40,
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