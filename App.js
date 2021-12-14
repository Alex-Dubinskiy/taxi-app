import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store_redux/store';
import StartScreen from './components/StartScreen/StartScreen';
import AuthSlider from './components/AuthorizationScreens/authSlider';
import MainAppPart from './components/MainAppPartScreens/MainAppPart';
import SliderForFirstAppLoad from './components/SliderForFirstAppLoad';

// Fonts init
const fonts = () => Font.loadAsync ({
  'murecho_light': require('./assets/fonts/Murecho/Murecho-Light.ttf'),
  'murecho_regular': require('./assets/fonts/Murecho/Murecho-Regular.ttf'),
  'murecho_medium': require('./assets/fonts/Murecho/Murecho-Medium.ttf'),
  'murecho_sBold': require('./assets/fonts/Murecho/Murecho-SemiBold.ttf'),
  'murecho_bold': require('./assets/fonts/Murecho/Murecho-Bold.ttf'),
})

const Stack = createNativeStackNavigator();

export default function App() {
  const [font, setFont] = React.useState();

  if (font) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={
            {headerShown: false}
          }>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="AuthSlider" component={AuthSlider} />
            <Stack.Screen name="MainAppPart" component={MainAppPart} />
            <Stack.Screen name="SliderForFirstAppLoad" component={SliderForFirstAppLoad} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
  else {
    return (
      <AppLoading 
        startAsync={fonts} 
        onFinish={() => setFont(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
