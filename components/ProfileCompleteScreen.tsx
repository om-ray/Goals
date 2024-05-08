import React, {useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Styles from './Style/Styles';

function ProfileCompleteScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('VisionBoardScreen');
    }, 1000);
  });

  return (
    <View style={Styles.containerCenter}>
      <Image
        resizeMethod="scale"
        resizeMode="contain"
        style={styles.image}
        source={require('../assets/generationComplete.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
  },
});

export default ProfileCompleteScreen;
