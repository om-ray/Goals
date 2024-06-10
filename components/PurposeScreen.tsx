import {NavigationProp} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {Context} from '../Context';
import Header from './Header';
import Styles from './Style/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SELECTED_OPTIONS_KEY} from '../App';

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
          ? Styles.optionButtonClicked
          : Styles.optionButton
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
            ? Styles.optionTextClicked
            : Styles.optionText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={70} />
      <Text style={Styles.mainText}>What is your purpose in life?</Text>
      <FlatList
        contentContainerStyle={Styles.optionsContainer}
        data={options}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item}
      />
      <TouchableOpacity
        onPress={async () => {
          try {
            await AsyncStorage.removeItem(SELECTED_OPTIONS_KEY);
          } finally {
            console.log('storage cleared');
          }
        }}
        style={Styles.moreOptionsButton}>
        <Image source={require('../assets/MaxiReset.png')} />
        <Text style={Styles.moreOptionsText}>More options</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PurposeScreen;
