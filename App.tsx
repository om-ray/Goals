/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './components/Splash.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import PurposeScreen from './components/PurposeScreen.tsx';
import LifestyleScreen from './components/LifestyleScreen.tsx';
import MaterialDesiresScreen from './components/MaterialDesiresScreen.tsx';
import PfpScreen from './components/PfpScreen.tsx';
import CustomCamera from './components/CustomCamera.tsx';
import ProfileCTAScreen from './components/ProfileCTAScreen.tsx';
import PhoneNumberScreen from './components/PhoneNumberScreen.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import NameScreen from './components/NameScreen.tsx';
import ProfileCompleteScreen from './components/ProfileCompleteScreen.tsx';
import VisionBoardScreen from './components/VisionBoardScreen.tsx';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import Config from 'react-native-config';
import firestore from '@react-native-firebase/firestore';
import {Context} from './Context.js';

const Stack = createNativeStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';
export const SELECTED_OPTIONS_KEY = 'SELECTED_OPTIONS';

function App() {
  const [isReady, setIsReady] = useState(Platform.OS === 'web');
  const [initialState, setInitialState] = useState();
  const [images, setImages] = useState<any>(() => null);
  const [progress, setProgess] = useState(() => 0);
  let generatingImage = false;
  const [selectedOptions, setSelectedOptions] = useState({
    purpose: '',
    lifestyle: '',
    materialDesires: {home: [], ride: [], style: [], misc: []},
    userPhotos: [],
    userPhotosDownloadURIs: [],
    verified: false,
    phoneNumber: '',
    name: '',
  });

  function getRandomInt() {
    let min = 0;
    let max = 2;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const uploadImage = async (imageUri: string) => {
    if (!imageUri) {
      console.error('No image URI provided');
      return;
    }

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

    const task = storage().ref(filename).putFile(uploadUri);

    try {
      await task;
      const url = await storage().ref(filename).getDownloadURL();
      console.log(selectedOptions.userPhotosDownloadURIs);

      setSelectedOptions((prevState: any) => ({
        ...prevState,
        userPhotosDownloadURIs: [url],
      }));
    } catch (e) {
      console.error('Error uploading image:', e);
    }
  };

  useEffect(() => {
    const restoreSelectedOptions = async () => {
      try {
        const savedOptions = await AsyncStorage.getItem(SELECTED_OPTIONS_KEY);
        if (savedOptions) {
          setSelectedOptions(JSON.parse(savedOptions));
          console.log('Selected options restored');
        }
      } catch (error) {
        console.error('Failed to restore selected options', error);
      }
    };

    restoreSelectedOptions();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(SELECTED_OPTIONS_KEY, JSON.stringify(selectedOptions))
      .then(() => console.log('Selected options saved'))
      .catch(error => console.error('Failed to save selected options', error));

    console.log(selectedOptions);

    if (
      selectedOptions.userPhotos.length > 0 &&
      selectedOptions.userPhotosDownloadURIs.length !==
        selectedOptions.userPhotos.length
    ) {
      selectedOptions.userPhotos.map((imageURI: string) => {
        uploadImage(imageURI);
      });
    }
  }, [selectedOptions]);

  useEffect(() => {
    const saveToFirestore = async () => {
      if (
        selectedOptions.purpose &&
        selectedOptions.lifestyle &&
        selectedOptions.materialDesires.home.length > 0 &&
        selectedOptions.materialDesires.ride.length > 0 &&
        selectedOptions.materialDesires.style.length > 0 &&
        selectedOptions.userPhotos.length > 0 &&
        selectedOptions.userPhotosDownloadURIs.length > 0 &&
        selectedOptions.phoneNumber &&
        selectedOptions.name
      ) {
        try {
          await firestore()
            .collection('user-profiles')
            .doc(`${selectedOptions.name}-${selectedOptions.phoneNumber}`)
            .set(selectedOptions);
          console.log('Selected options saved to Firestore');
        } catch (error) {
          console.error('Error saving selected options to Firestore', error);
        }
      }
    };

    saveToFirestore();
  }, [selectedOptions]);

  useEffect(() => {
    if (selectedOptions.userPhotosDownloadURIs.length > 0) {
      const prompt = `${
        selectedOptions.userPhotosDownloadURIs[0]
      } A full body shot of this person in 5 years, standing and facing the camera and is wearing the style of ${
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
      }, --ar 1:1 --no frames, sitting, fat, ugly, short, black bars, background, double chin, bad hands, bad anatomy`;

      console.log(prompt);

      const generateImage = async function () {
        if (
          !generatingImage &&
          selectedOptions.userPhotos.length > 0 &&
          !images
        ) {
          generatingImage = true;
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
              if (!images) {
                console.log('0', imageResponse.uri);
                setImages(() => {
                  return imageResponse.uri;
                });
                return;
              }
            } else {
              if (!images) {
                let intervalId = setInterval(async () => {
                  imageResponse = await checkImageStatus(messageId);
                  if (imageResponse.status === 'DONE') {
                    clearInterval(intervalId);
                    console.log('1', imageResponse.uri);
                    setImages(() => {
                      return imageResponse.uri;
                    });
                    return;
                  }
                }, 500);
              }
            }
          } catch (error) {
            console.error('Error generating image:', error);
          }
        }
      };

      if (
        selectedOptions.userPhotosDownloadURIs.length > 0 &&
        selectedOptions.materialDesires.style.length > 0 &&
        selectedOptions.materialDesires.home.length > 0 &&
        selectedOptions.materialDesires.ride.length > 0 &&
        selectedOptions.purpose &&
        selectedOptions.lifestyle &&
        !generatingImage
      ) {
        generateImage();
      }
    }
  }, [selectedOptions]);

  const checkImageStatus = async (messageId: any) => {
    const statusResponse = await axios.get(
      `https://api.mymidjourney.ai/api/v1/midjourney/message/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${Config.MIDJOURNEY_API_TOKEN}`,
        },
      },
    );
    console.log(
      'Image status:',
      JSON.stringify(statusResponse.data.status),
      '\n Image progress:',
      JSON.stringify(statusResponse.data?.progress),
    );
    setProgess(prevState => {
      return statusResponse.data.progress
        ? statusResponse.data.progress < prevState
          ? prevState
          : statusResponse.data.progress
        : prevState;
    });
    return statusResponse.data;
  };

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        if (savedStateString) {
          const state = JSON.parse(savedStateString);
          setInitialState(state);
        }
      } catch (e) {
        console.error('Failed to load navigation state', e);
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      <Context.Provider
        value={{
          selectedOptions: selectedOptions,
          setSelectedOptions: setSelectedOptions,
          images: images,
          setImages: setImages,
          progress: progress,
        }}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PurposeScreen"
            component={PurposeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LifestyleScreen"
            component={LifestyleScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MaterialDesiresScreen"
            component={MaterialDesiresScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PfpScreen"
            component={PfpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CustomCamera"
            component={CustomCamera}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileCTAScreen"
            component={ProfileCTAScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PhoneNumberScreen"
            component={PhoneNumberScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NameScreen"
            component={NameScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProfileCompleteScreen"
            component={ProfileCompleteScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VisionBoardScreen"
            component={VisionBoardScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}

export default App;
