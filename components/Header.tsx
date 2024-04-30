import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

function Header({
  navigation,
  progress,
}: {
  navigation: NavigationProp<any>;
  progress: number;
}) {
  return (
    <View style={styles.headerContainer}>
      <View id="progressBar" style={{...styles.progressBar, width: progress}} />
      <TouchableOpacity style={styles.backButton}>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButtonText}>
          ←
        </Text>
      </TouchableOpacity>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  logo: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}],
  },
  progressBar: {
    height: 5,
    backgroundColor: '#CC6F35',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    position: 'absolute',
    top: '50%',
    left: 0,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
});

export default Header;
