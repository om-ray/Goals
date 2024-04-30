import {NavigationProp} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Context} from '../Context';

const LifestyleScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const {selectedOptions, setSelectedOptions} = useContext(Context);

  const options = [
    'Very Active & Healthy',
    'Video Games Daily',
    'Go to Clubs Every Night',
    'Hang with Close Friends',
    'Extreme Sports',
    'Build Huge Company',
    'Hangout with Family',
  ];

  const renderItem = (item: string) => (
    <TouchableOpacity
      style={
        item === selectedOptions.lifestyle
          ? styles.optionButtonClicked
          : styles.optionButton
      }
      onPress={() => {
        setSelectedOptions((prevState: any) => {
          return {...prevState, lifestyle: item};
        });
        setTimeout(() => {
          navigation.navigate('MaterialDesiresScreen');
        }, 500);
      }}>
      <Text
        style={
          item === selectedOptions.lifestyle
            ? styles.optionTextClicked
            : styles.optionText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBar} />
        <TouchableOpacity style={styles.backButton}>
          <Text
            onPress={() => {
              navigation.navigate('SplashScreen');
            }}
            style={styles.backButtonText}>
            ←
          </Text>
        </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.question}>What is your ideal lifestyle?</Text>
      <FlatList
        contentContainerStyle={styles.optionsContainer}
        data={options}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item}
      />
      <TouchableOpacity style={styles.moreOptionsButton}>
        <Image source={require('../assets/MaxiReset.png')} />
        <Text style={styles.moreOptionsText}>More options</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c2c2c',
    paddingVertical: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    paddingTop: 10,
  },
  logo: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}],
  },
  progressBar: {
    width: 140,
    height: 5,
    backgroundColor: '#CC6F35',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    position: 'absolute',
    top: '50%',
    left: 0,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  question: {
    color: '#fff',
    fontSize: 25,
    marginTop: 40,
    fontFamily: 'Bodoni-72-Book',
    letterSpacing: -1.9,
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
    fontFamily: 'Poppis-Medium',
  },
  optionButtonClicked: {
    backgroundColor: '#CC6F35',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 12,
    minWidth: '80%',
    fontFamily: 'Poppis-Medium',
  },
  optionText: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: 18,
    textAlign: 'center',
  },
  optionTextClicked: {
    color: '#fff',
    fontSize: 18,
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
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'Poppins-Medium',
  },
});

export default LifestyleScreen;
