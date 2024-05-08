/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Header from './Header';
import {NavigationProp} from '@react-navigation/native';
import {Context} from '../Context';
import Styles from './Style/Styles';

function NameScreen({navigation}: {navigation: NavigationProp<any>}) {
  const [name, setName] = useState('');
  const {selectedOptions, setSelectedOptions} = useContext(Context);

  useEffect(() => {
    if (selectedOptions.name) {
      navigation.navigate('ProfileCompleteScreen');
    }
  }, [selectedOptions]);

  return (
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={360} />
      <Text style={Styles.mainTextMarginBottom}>What’s your first name?</Text>
      <TextInput
        autoFocus
        style={Styles.defaultInput}
        placeholder="Arlin"
        onChangeText={val => {
          setName(val);
        }}
        value={name}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior="position"
        style={Styles.buttonContainer}>
        {name ? (
          <TouchableOpacity
            onPress={() => {
              setSelectedOptions((prevState: any) => {
                return {...prevState, name: name};
              });
            }}
            style={Styles.button}>
            <Text style={Styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default NameScreen;
