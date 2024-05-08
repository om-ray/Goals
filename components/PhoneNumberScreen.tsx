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

function PhoneNumberScreen({navigation}: {navigation: NavigationProp<any>}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {selectedOptions, setSelectedOptions} = useContext(Context);

  const formatPhoneNumber = (text: string) => {
    const digits = text.replace(/[^\d]/g, '');
    if (digits.length === 0) {
      return `${digits}`;
    } else if (digits.length <= 3) {
      return `(${digits}`;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10,
      )}`;
    }
  };

  const handleChange = (text: any) => {
    const formattedText = formatPhoneNumber(text);
    setPhoneNumber(formattedText);
  };

  useEffect(() => {
    if (selectedOptions.phoneNumber.length === 14) {
      navigation.navigate('AuthScreen');
    }
  }, [selectedOptions]);

  return (
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={300} />
      <Text style={Styles.mainTextMarginBottom}>Type your phone number.</Text>
      <TextInput
        keyboardType="numeric"
        autoFocus
        style={Styles.defaultInput}
        placeholder="(XXX) XXX-XXXX"
        onChangeText={handleChange}
        value={phoneNumber}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior="position"
        style={Styles.buttonContainer}>
        {phoneNumber.length >= 14 ? (
          <TouchableOpacity
            onPress={() => {
              setSelectedOptions((prevState: any) => {
                return {...prevState, phoneNumber: phoneNumber};
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

export default PhoneNumberScreen;
