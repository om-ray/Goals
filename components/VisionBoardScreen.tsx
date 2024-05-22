import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Styles from './Style/Styles';
import {Context} from '../Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SELECTED_OPTIONS_KEY} from '../App';
import * as Progress from 'react-native-progress';

const VisionBoardScreen = () => {
  const {images, progress} = useContext(Context);
  const [imagesLoaded, setImagesLoaded] = useState(() => false);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView contentContainerStyle={Styles.containerCenter}>
        <View style={styles.imageContainer}>
          <Image
            resizeMethod="scale"
            resizeMode="cover"
            source={{uri: images}}
            style={styles.image}
            onLoad={() => {
              setTimeout(() => setImagesLoaded(true), 2000);
            }}
          />
        </View>
        {!images && !imagesLoaded ? (
          <Progress.Circle
            style={styles.loader}
            size={200}
            color="#CC6F35"
            thickness={10}
            fill="rgba(0, 0, 0, 0.2)"
            progress={progress / 100}
          />
        ) : (
          <TouchableOpacity
            onPress={async () => {
              try {
                await AsyncStorage.removeItem(SELECTED_OPTIONS_KEY);
              } finally {
                console.log('storage cleared');
              }
            }}
            style={Styles.button}>
            <Image
              resizeMethod="scale"
              resizeMode="contain"
              style={Styles.buttonIcon}
              source={require('../assets/shareArrow.png')}
            />
            <Text style={Styles.buttonText}>Share vision board</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 340,
    width: 340,
    overflow: 'hidden',
    borderRadius: 10,
    margin: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  loader: {
    position: 'absolute',
  },
});

export default VisionBoardScreen;
