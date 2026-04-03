import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#2F3820',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
  },

  birdCard: {
    backgroundColor: '#E9D1A6',
    borderRadius: 30,
    alignContent: 'center',
    width: '90%',
    maxWidth: 360,
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

  top:{
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    padding: 10,
    gap: 30,
  },

  TitleBox: {
    alignSelf: 'flex-end',
    backgroundColor: '#F6E2BE',
    borderRadius: 20,
    height: 128,
    width:160,
  },

  cardTitle: {
    fontFamily: 'LondrinaSolid-regular',
    fontSize: 18,
    textAlign: 'center',
  },

  infoBox: {
    flex: .95,
    width: 324,     
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

  BackButton: {
    alignContent: 'center',
  },
});

export default styles;