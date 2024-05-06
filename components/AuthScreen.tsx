import React, {useRef, useState} from 'react';
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

function AuthScreen({navigation}: {navigation: NavigationProp<any>}) {
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

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} progress={300} />
      <Text style={styles.mainText}>Enter the code we sent you</Text>

      <View style={styles.inputContainer}>
        {authCode.map((digit, index) => (
          <TextInput
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
        style={styles.nextButtonContainer}>
        {authCode.join('').length >= numOfDigits ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('AuthScreen')}
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
    flexDirection: 'row',
    marginBottom: 500,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    width: 60,
    height: 60,
    fontSize: 20,
    margin: 5,
    fontFamily: 'Poppins-Medium',
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
    height: 40,
  },
  nextButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 16,
  },
});

export default AuthScreen;
