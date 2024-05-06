/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Header from './Header';
import {NavigationProp} from '@react-navigation/native';
import {Context} from '../Context';

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
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} progress={300} />
      <Text style={styles.mainText}>Type your phone number.</Text>
      <TextInput
        keyboardType="numeric"
        autoFocus
        style={styles.inputContainer}
        placeholder="(XXX) XXX-XXXX"
        onChangeText={handleChange}
        value={phoneNumber}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior="position"
        style={styles.nextButtonContainer}>
        {phoneNumber.length >= 14 ? (
          <TouchableOpacity
            onPress={() => {
              setSelectedOptions((prevState: any) => {
                return {...prevState, phoneNumber: phoneNumber};
              });
            }}
            style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2c2c2c',
  },
  mainText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Bodoni-72-Book',
    letterSpacing: -1.9,
    marginTop: 70,
    marginBottom: 30,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontSize: 20,
    width: 300,
    margin: 5,
    marginBottom: 500,
  },
  nextButtonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#CC6F35',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 350,
    height: 50,
  },
  nextButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 16,
  },
});

export default PhoneNumberScreen;
