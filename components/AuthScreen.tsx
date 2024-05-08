/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import Header from './Header';
import {NavigationProp} from '@react-navigation/native';
import Styles from './Style/Styles';
import {Context} from '../Context';

function AuthScreen({navigation}: {navigation: NavigationProp<any>}) {
  const {selectedOptions, setSelectedOptions} = useContext(Context);
  const numOfDigits = 5;
  const [authCode, setAuthCode] = useState(new Array(numOfDigits).fill(''));

  const inputsRef = useRef<any[]>([]);
  inputsRef.current = new Array(numOfDigits)
    .fill(null)
    .map((_, i) => inputsRef.current[i] ?? React.createRef());

  const handleChange = (text: any, index: number) => {
    const newCode = [...authCode];
    newCode[index] = text;
    setAuthCode(newCode);

    if (text && index < numOfDigits - 1) {
      inputsRef.current[index + 1].current.focus();
    }

    if (!text && index > 0) {
      inputsRef.current[index - 1].current.focus();
    }
  };

  useEffect(() => {
    if (selectedOptions.verified) {
      navigation.navigate('NameScreen');
    }
  }, [selectedOptions]);

  return (
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={330} />
      <Text style={Styles.mainTextMarginBottom}>
        Enter the code we sent you
      </Text>

      <View style={styles.inputContainer}>
        {authCode.map((digit, index) => (
          <TextInput
            autoFocus={index === 0}
            key={index}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleChange(text, index)}
            placeholder={`${index + 1}`}
            ref={inputsRef.current[index]}
            textAlign="center"
          />
        ))}
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior="position"
        style={Styles.buttonContainer}>
        {authCode.join('').length >= numOfDigits ? (
          <TouchableOpacity
            onPress={() => {
              setSelectedOptions((prevState: any) => {
                return {...prevState, verified: true};
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

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 500,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 60,
    height: 60,
    ...Styles.textMedium,
    margin: 5,
    fontFamily: 'Poppins-Medium',
  },
});

export default AuthScreen;
