/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from './Header';
import {Context} from '../Context';
import {useContext, useEffect} from 'react';
import Styles from './Style/Styles';

const PfpScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
  const {selectedOptions, setSelectedOptions} = useContext(Context);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        showPhotoOptions();
      } else {
        console.log('Camera or Gallery permission denied');
      }
    } else {
      showPhotoOptions();
    }
  };

  const showPhotoOptions = () => {
    Alert.alert('Upload Photo', 'Choose your photo source:', [
      {
        text: '🤳 Take a selfie',
        onPress: () => handleCamera(),
      },
      {
        text: '🖼 Upload from gallery',
        onPress: () => handleGallery(),
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const handleCamera = () => {
    navigation.navigate('CustomCamera');
  };

  const handleGallery = () => {
    const options = {
      selectionLimit: 5,
      mediaType: 'photo' as 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorMessage) {
        console.log('Gallery Picker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        let photosArr = response.assets.map(val => {
          return val.uri;
        });

        setSelectedOptions((prevState: any) => {
          return {...prevState, photos: photosArr};
        });
      } else {
        console.log('No assets returned from gallery');
      }
    });
  };

  useEffect(() => {
    if (selectedOptions.photos.length > 0) {
      navigation.navigate('ProfileCTAScreen');
    }
  }, [selectedOptions]);

  return (
    <SafeAreaView style={Styles.container}>
      <Header navigation={navigation} progress={220} />
      <Text style={Styles.mainTextMarginBottom}>Take or upload 1-5 photos</Text>
      <TouchableOpacity onPress={requestCameraPermission}>
        <Image
          style={styles.addPhoto}
          source={require('../assets/AddPhoto.png')}
        />
      </TouchableOpacity>
      <View style={Styles.contentContainer}>
        <View style={styles.requirementItem}>
          <Image
            style={styles.icon}
            source={require('../assets/CheckMark.png')}
          />
          <Text style={Styles.textSmall}>Face only</Text>
        </View>
        <View style={styles.requirementItem}>
          <Image
            style={styles.icon}
            source={require('../assets/CheckMark.png')}
          />
          <Text style={Styles.textSmall}>Well-lit and in focus</Text>
        </View>
        <View style={styles.requirementItem}>
          <Image style={styles.icon} source={require('../assets/XMark.png')} />
          <Text style={Styles.textSmall}>No full length</Text>
        </View>
        <View style={styles.requirementItem}>
          <Image style={styles.icon} source={require('../assets/XMark.png')} />
          <Text style={Styles.textSmall}>No hats, glasses, etc.</Text>
        </View>
      </View>
      <Text style={styles.footerText}>
        Maxi uses this photo to generate your custom vision board
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addPhoto: {
    width: 160,
    height: 160,
    marginBottom: 40,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 200,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  footerText: {
    textAlign: 'center',
    width: '70%',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    position: 'absolute',
    bottom: 80,
    fontFamily: 'Poppins',
  },
});

export default PfpScreen;
