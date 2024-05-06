import React, {useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

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
    <View style={styles.container}>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c2c',
  },
  image: {
    width: 250,
  },
});

export default ProfileCompleteScreen;
