import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './components/Splash.tsx';
import SplashScreen from './components/SplashScreen.tsx';
import PurposeScreen from './components/PurposeScreen.tsx';
// import LifestyleScreen from './components/LifestyleScreen.tsx';
// import MaterialDesriesScreen from './components/MaterialDesriesScreen.tsx';
// import PfpScreen from './components/PfpScreen.tsx';
// import SelfieScreen from './components/SelfieScreen.tsx';
// import ProfileCTAScreen from './components/ProfileCTAScreen.tsx';
// import PhoneNumberScreen from './components/PhoneNumberScreen.tsx';
// import AuthScreen from './components/AuthScreen.tsx';
// import NameScreen from './components/NameScreen.tsx';
// import ProfileCompleteScreen from './components/ProfileCompleteScreen.tsx';
// import VisionBoardScreen from './components/VisionBoardScreen.tsx';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
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
        {/* <Stack.Screen
          name="LifestyleScreen"
          component={LifestyleScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MaterialDesriesScreen"
          component={MaterialDesriesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PfpScreen"
          component={PfpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelfieScreen"
          component={SelfieScreen}
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
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
