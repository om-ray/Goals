import {NavigationProp} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {Context} from '../Context';
import Header from './Header';
import Styles from './Style/Styles';
import {SafeAreaView} from 'react-native-safe-area-context';

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
          ? Styles.optionButtonClicked
          : Styles.optionButton
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
            ? Styles.optionTextClicked
            : Styles.optionText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={140} />
      <Text style={Styles.mainText}>What is your ideal lifestyle?</Text>
      <FlatList
        contentContainerStyle={Styles.optionsContainer}
        data={options}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item}
      />
      <TouchableOpacity style={Styles.moreOptionsButton}>
        <Image source={require('../assets/MaxiReset.png')} />
        <Text style={Styles.moreOptionsText}>More options</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LifestyleScreen;
