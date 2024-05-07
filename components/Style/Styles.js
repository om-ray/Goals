import {StyleSheet} from 'react-native';

const extraLargeText = 30;
const largeText = 25;
const mediumText = 20;
const smallText = 16;
const extraSmallText = 12;

const Styles = StyleSheet.create({
  textExtraLarge: {
    color: '#fff',
    fontSize: extraLargeText,
  },
  textLarge: {
    color: '#fff',
    fontSize: largeText,
  },
  textMedium: {
    color: '#fff',
    fontSize: mediumText,
  },
  textSmall: {
    color: '#fff',
    fontSize: smallText,
  },
  textExtraSmall: {
    color: '#fff',
    fontSize: extraSmallText,
  },
  textSmallSelected: {
    color: '#000',
    fontSize: smallText,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2c2c2c',
  },
  mainText: {
    color: '#fff',
    fontSize: largeText,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: -1,
    marginTop: 50,
    marginBottom: 0,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 12,
    minWidth: '80%',
    fontFamily: 'Poppins-Medium',
  },
  optionButtonClicked: {
    backgroundColor: '#CC6F35',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 12,
    minWidth: '80%',
    fontFamily: 'Poppins-Medium',
  },
  optionText: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: mediumText,
    textAlign: 'center',
  },
  optionTextClicked: {
    color: '#fff',
    fontSize: mediumText,
    textAlign: 'center',
  },
  moreOptionsButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 50,
    width: '55%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  moreOptionsText: {
    color: '#CC6F35',
    fontSize: smallText,
    marginLeft: 5,
    fontFamily: 'Poppins-Medium',
  },
  contentContainer: {
    display: 'flex',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#CC6F35',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 350,
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: smallText,
    fontFamily: 'Poppins-ExtraBold',
  },
  defaultInput: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: mediumText,
    paddingHorizontal: 30,
    paddingVertical: 20,
    width: 300,
    margin: 5,
    marginBottom: 500,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
});

export default Styles;
