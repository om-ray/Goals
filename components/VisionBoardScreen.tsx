/* eslint-disable react-hooks/exhaustive-deps */
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
import Config from 'react-native-config';
import axios from 'axios';

const VisionBoardScreen = () => {
  const {selectedOptions} = useContext(Context);
  const [images, setImages] = useState<any[]>([]);

  function getRandomInt() {
    let min = 0;
    let max = 2;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const prompt = `A full body shot of a man who is wearing the style of ${
      selectedOptions.materialDesires.style[getRandomInt()]
    }, who has achieved their purpose of ${
      selectedOptions.purpose
    } and lives the lifestyle of ${
      selectedOptions.lifestyle
    }, standing in front of their dream home which is a ${
      selectedOptions.materialDesires.home[getRandomInt()]
    }, and their dream car(s) which is a ${
      selectedOptions.materialDesires.ride.length > 1
        ? selectedOptions.materialDesires.ride[getRandomInt()]
        : selectedOptions.materialDesires.ride[0]
    }`;

    const generateImage = async () => {
      if (selectedOptions.userPhotos.length > 0 && images.length < 2) {
        try {
          const creationResponse = await axios.post(
            'https://api.mymidjourney.ai/api/v1/midjourney/imagine',
            {
              prompt: prompt,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Config.MIDJOURNEY_API_TOKEN}`,
              },
            },
          );

          const messageId = creationResponse.data.messageId;
          let imageResponse = await checkImageStatus(messageId);

          if (imageResponse.status === 'DONE') {
            console.log('0', imageResponse.uri);
            setImages((prev: any) => {
              return [...prev, imageResponse.uri];
            });
          } else {
            let intervalId = setInterval(async () => {
              imageResponse = await checkImageStatus(messageId);
              if (imageResponse.status === 'DONE') {
                clearInterval(intervalId);
                console.log('1', imageResponse.uri);
                setImages((prev: any) => {
                  return [...prev, imageResponse.uri];
                });
              }
            }, 500);
          }
        } catch (error) {
          console.error('Error generating image:', error);
        }
      }
    };

    generateImage();
    if (images.length < 2) {
      generateImage();
    }
  }, [selectedOptions]);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const checkImageStatus = async (messageId: any) => {
    const statusResponse = await axios.get(
      `https://api.mymidjourney.ai/api/v1/midjourney/message/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${Config.MIDJOURNEY_API_TOKEN}`,
        },
      },
    );
    console.log('Image status:', JSON.stringify(statusResponse.data.status));
    return statusResponse.data;
  };

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView contentContainerStyle={Styles.containerCenter}>
        <View style={styles.imageContainer}>
          {images.map((imageUri: string, index: any) => {
            return (
              <Image
                key={index}
                resizeMethod="scale"
                resizeMode="cover"
                source={{uri: imageUri}}
                style={styles.image}
              />
            );
          })}
        </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 510,
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
});

export default VisionBoardScreen;
