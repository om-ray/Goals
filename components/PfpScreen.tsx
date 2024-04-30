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
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const PfpScreen = ({navigation}: {navigation: NavigationProp<any>}) => {
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
    const options = {
      saveToPhotos: true,
      mediaType: 'photo' as 'photo',
      includeBase64: false,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri};
        console.log('New photo taken: ', source);
      } else {
        console.log('No assets returned from camera');
      }
    });
  };

  const handleGallery = () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'photo' as 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery picker');
      } else if (response.errorMessage) {
        console.log('Gallery Picker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri};
        console.log('Photo selected: ', source);
      } else {
        console.log('No assets returned from gallery');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.progressBar} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.question}>Take or upload 1-5 photos</Text>
      <TouchableOpacity onPress={requestCameraPermission}>
        <Image
          style={styles.addPhoto}
          source={require('../assets/AddPhoto.png')}
        />
      </TouchableOpacity>
      <View style={styles.requirements}>
        <View style={styles.requirementItem}>
          <Image
            style={styles.checkIcon}
            source={require('../assets/CheckMark.png')}
          />
          <Text style={styles.requirementText}>Face only</Text>
        </View>
        <View style={styles.requirementItem}>
          <Image
            style={styles.checkIcon}
            source={require('../assets/CheckMark.png')}
          />
          <Text style={styles.requirementText}>Well-lit and in focus</Text>
        </View>
        <View style={styles.requirementItem}>
          <Image style={styles.xIcon} source={require('../assets/XMark.png')} />
          <Text style={styles.requirementText}>No full length</Text>
        </View>
        <View style={styles.requirementItem}>
          <Image style={styles.xIcon} source={require('../assets/XMark.png')} />
          <Text style={styles.requirementText}>No hats, glasses, etc.</Text>
        </View>
      </View>
      <Text style={styles.footerText}>
        Maxi uses this photo to generate your custom vision board
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2c2c2c',
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    paddingTop: 10,
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
    width: 220,
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
  question: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Bodoni-72-Book',
    letterSpacing: -1.9,
    marginTop: 70,
    marginBottom: 50,
  },
  addPhoto: {
    width: 160,
    height: 160,
    marginBottom: 40,
  },
  requirements: {
    display: 'flex',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    minWidth: 200,
  },
  checkIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  xIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  requirementText: {
    color: '#fff',
    fontSize: 16,
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
