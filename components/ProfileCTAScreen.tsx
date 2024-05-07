/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Header from './Header';
import {NavigationProp} from '@react-navigation/native';
import Styles from './Style/Styles';

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
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={260} />
      <Text style={Styles.mainText}>Generating...</Text>
      <View style={Styles.contentContainer}>
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
    ...Styles.textExtraLarge,
    fontFamily: 'Poppins-SemiBold',
  },
  etaText: {
    ...Styles.textExtraSmall,
    fontFamily: 'Poppins',
  },
  footerText: {
    textAlign: 'center',
    width: '50%',
    ...Styles.textMedium,
    position: 'absolute',
    bottom: 170,
    fontFamily: 'Poppins-Medium',
  },
});

export default ProfileCTAScreen;
