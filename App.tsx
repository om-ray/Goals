import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './components/Splash.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import PurposeScreen from './components/PurposeScreen.tsx';
import {useEffect, useState} from 'react';
import {Context} from './Context.js';
import LifestyleScreen from './components/LifestyleScreen.tsx';
import MaterialDesiresScreen from './components/MaterialDesiresScreen.tsx';
import PfpScreen from './components/PfpScreen.tsx';
import CustomCamera from './components/CustomCamera.tsx';
import ProfileCTAScreen from './components/ProfileCTAScreen.tsx';
import PhoneNumberScreen from './components/PhoneNumberScreen.tsx';
import AuthScreen from './components/AuthScreen.tsx';
import NameScreen from './components/NameScreen.tsx';
import ProfileCompleteScreen from './components/ProfileCompleteScreen.tsx';
// import VisionBoardScreen from './components/VisionBoardScreen.tsx';

const Stack = createNativeStackNavigator();

function App() {
  const [selectedOptions, setSelectedOptions] = useState({
    purpose: '',
    lifestyle: '',
    materialDesires: {home: [], ride: [], style: [], misc: []},
    photos: [],
    phoneNumber: '',
    name: '',
  });

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);

  return (
    <NavigationContainer>
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
          {/* <Stack.Screen
            name="VisionBoardScreen"
            component={VisionBoardScreen}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}

export default App;
