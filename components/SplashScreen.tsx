import * as React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Styles from './Style/Styles';

const SplashScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>AI vision boards & mindset tracker</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PurposeScreen')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By logging in or signing up, you agree to our{' '}
          <Text style={styles.linkText} onPress={() => {}}>
            Terms of Use
          </Text>{' '}
          and have read and agreed to our{' '}
          <Text style={styles.linkText} onPress={() => {}}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c2c2c',
    paddingTop: 200,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  title: {
    ...Styles.textMedium,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  buttonContainer: {
    width: '96%',
  },
  button: {
    backgroundColor: '#CC6F35',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    ...Styles.textMedium,
    fontFamily: 'Poppins-ExtraBold',
  },
  termsText: {
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    ...Styles.textExtraSmall,
  },
  linkText: {
    fontFamily: 'Poppins-SemiBold',
  },
});

export default SplashScreen;
