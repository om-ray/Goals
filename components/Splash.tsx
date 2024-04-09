import * as React from 'react';
const {useEffect} = React;
import {StyleSheet, View, Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const Splash = ({navigation}: {navigation: NavigationProp<any>}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SplashScreen');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2c2c2c',
    padding: 200,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default Splash;
