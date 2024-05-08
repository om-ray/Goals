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

const VisionBoardScreen = () => {
  const {selectedOptions} = useContext(Context);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    if (selectedOptions.photos.length > 0) {
      setImages(selectedOptions.photos);
    }
  }, [selectedOptions]);

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
        <TouchableOpacity style={Styles.button}>
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
    padding: 10,
  },
  image: {
    width: 170,
    height: 170,
    margin: 5,
    borderRadius: 10,
  },
});

export default VisionBoardScreen;
