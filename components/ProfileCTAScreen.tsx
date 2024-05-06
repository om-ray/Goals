/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from './Header';
import {NavigationProp} from '@react-navigation/native';

function ProfileCTAScreen({navigation}: {navigation: NavigationProp<any>}) {
  const [percentageDone, setPercentageDone] = useState(24.7);

  useEffect(() => {
    let progressInterval: any = setInterval(() => {
      setPercentageDone((prevState: any) => {
        return prevState + Math.round((Math.random() * 10) / 10);
      });

      if (percentageDone >= 100) {
        setPercentageDone(100);
        clearInterval(progressInterval);
      }

      return progressInterval;
    }, 500);

    setTimeout(() => {
      navigation.navigate('PhoneNumberScreen');
      clearInterval(progressInterval);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} progress={260} />
      <Text style={styles.mainText}>Generating...</Text>
      <View style={styles.contentContainer}>
        <View style={styles.contentItem}>
          <Image source={require('../assets/ProfileCtaBlurImage.png')} />
          <View style={styles.imageGenContentContainer}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Text style={styles.percentageText}>{percentageDone}%</Text>
            <Text style={styles.etaText}>ETA: 1 min</Text>
          </View>
        </View>
      </View>
      <Text style={styles.footerText}>
        Complete your profile while you wait
      </Text>
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
    marginBottom: 50,
  },
  contentContainer: {
    display: 'flex',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    minWidth: 200,
  },
  imageGenContentContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
    marginTop: 70,
  },
  percentageText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
  },
  etaText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  footerText: {
    textAlign: 'center',
    width: '50%',
    color: '#fff',
    fontSize: 20,
    position: 'absolute',
    bottom: 170,
    fontFamily: 'Poppins-Medium',
  },
});

export default ProfileCTAScreen;
