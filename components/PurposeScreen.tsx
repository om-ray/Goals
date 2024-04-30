import {NavigationProp} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {Context} from '../Context';
import Header from './Header';

const PurposeScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const {selectedOptions, setSelectedOptions} = useContext(Context);
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
    <TouchableOpacity
      style={
        item === selectedOptions.purpose
          ? styles.optionButtonClicked
          : styles.optionButton
      }
      onPress={() => {
        setSelectedOptions((prevState: any) => {
          return {...prevState, purpose: item};
        });
        setTimeout(() => {
          navigation.navigate('LifestyleScreen');
        }, 500);
      }}>
      <Text
        style={
          item === selectedOptions.purpose
            ? styles.optionTextClicked
            : styles.optionText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} progress={70} />
      <Text style={styles.question}>What is your purpose in life?</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c2c2c',
    paddingBottom: 50,
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

export default PurposeScreen;
