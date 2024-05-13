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
import {Context} from './Context.js';

const Stack = createNativeStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';
export const SELECTED_OPTIONS_KEY = 'SELECTED_OPTIONS';

function App() {
  const [isReady, setIsReady] = useState(Platform.OS === 'web');
  const [initialState, setInitialState] = useState();
  const [selectedOptions, setSelectedOptions] = useState({
    purpose: '',
    lifestyle: '',
    materialDesires: {home: [], ride: [], style: [], misc: []},
    userPhotos: [],
    verified: false,
    phoneNumber: '',
    name: '',
  });

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
  }, [selectedOptions]);

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
