import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Svg, {Circle} from 'react-native-svg';
import {NavigationProp} from '@react-navigation/native';
import {Context} from '../Context';
import Styles from './Style/Styles';
import ImageResizer from 'react-native-image-resizer';

const CustomCamera = ({navigation}: {navigation: NavigationProp<any>}) => {
  const {setSelectedOptions} = useContext(Context);

  const takePicture = async (camera: any) => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    ImageResizer.createResizedImage(
      data.uri,
      700,
      700,
      'PNG',
      100,
      0,
      undefined,
      true,
      {
        onlyScaleDown: false,
        mode: 'cover',
      },
    )
      .then(response => {
        navigation.navigate('ProfileCTAScreen');
        console.log(response, JSON.stringify(response));

        setSelectedOptions((prevState: any) => {
          return {...prevState, userPhotos: [response.uri]};
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderCameraContent = (camera: any, status: string) => {
    if (status !== 'READY') {
      return <View />;
    }
    return (
      <View style={styles.cameraUI}>
        <Image source={require('../assets/Maxi.png')} style={styles.image} />
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton}>
            <Text
              onPress={() => {
                navigation.navigate('PfpScreen');
              }}
              style={styles.backButtonText}>
              ×
            </Text>
          </TouchableOpacity>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <TouchableOpacity
          onPress={() => takePicture(camera)}
          style={styles.capture}>
          <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <Circle cx="40" cy="40" r="32" fill="white" />
            <Circle cx="40" cy="40" r="38" stroke="white" stroke-width="4" />
          </Svg>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}>
        {/* @ts-ignore */}
        {({camera, status}) => renderCameraContent(camera, status)}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  cameraUI: {
    flex: 0,
    padding: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  capture: {
    position: 'absolute',
    flex: 0,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    width: 100,
    height: 100,
    bottom: 50,
  },
  headerContainer: {
    ...Styles.headerContainer,
    position: 'absolute',
    top: 40,
  },
  logo: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}],
  },
  backButton: {
    position: 'absolute',
    top: '50%',
    left: 10,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  backButtonText: {
    ...Styles.textExtraLarge,
    fontWeight: '900',
  },
});

export default CustomCamera;
