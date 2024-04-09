import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const PurposeScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const options = [
    'Become Famous',
    'Make Millions of Dollars',
    'Change the World',
    'Inspire Millions of People',
    'Become a Doctor or Lawyer',
    'Become a Pro Athlete',
    'Still Figuring it Out',
  ];

  const renderItem = (item: string) => (
    <TouchableOpacity style={styles.optionButton}>
      <Text style={styles.optionText}>{item}</Text>
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
      <Text style={styles.question}>What is your purpose in life?</Text>
      <FlatList
        data={options}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item}
      />
      <TouchableOpacity style={styles.moreOptionsButton}>
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
    width: 70,
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
    fontSize: 24,
    marginVertical: 20,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '90%',
  },
  optionText: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: 18,
    textAlign: 'center',
  },
  moreOptionsButton: {
    backgroundColor: '#CC6F35',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  moreOptionsText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PurposeScreen;
