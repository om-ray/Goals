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

function NameScreen({navigation}: {navigation: NavigationProp<any>}) {
  const [name, setName] = useState('');
  const {selectedOptions, setSelectedOptions} = useContext(Context);

  useEffect(() => {
    if (selectedOptions.name) {
      navigation.navigate('ProfileCompleteScreen');
    }
  }, [selectedOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} progress={360} />
      <Text style={styles.mainText}>What’s your first name?</Text>
      <TextInput
        autoFocus
        style={styles.inputContainer}
        placeholder="Arlin"
        onChangeText={val => {
          setName(val);
        }}
        value={name}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
        behavior="position"
        style={styles.nextButtonContainer}>
        {name ? (
          <TouchableOpacity
            onPress={() => {
              setSelectedOptions((prevState: any) => {
                return {...prevState, name: name};
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

export default NameScreen;
