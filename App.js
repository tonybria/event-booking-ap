import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './components/Tabs';
import { Featured, EventDetail } from './screens';
import { customFonts } from './constants';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';



const Stack = createStackNavigator();

export default function App() {
  const [assetsLoaded, setAssetLoaded] = useState(false);

  /* Loading custom fonts in async */
  const _loadAssetsAsync = async () => {
    await Font.loadAsync(customFonts);
    setAssetLoaded(true);
  };

  useEffect(() => {
    _loadAssetsAsync();
  });

  return assetsLoaded ? (
    <NavigationContainer>
      <StatusBar barStyle="light-content"> </StatusBar>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}
      >
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
         <Stack.Screen name="SignScreen" component={SignUpScreen} />
        <Stack.Screen name="Featured" component={Tabs} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="EventDetail" component={EventDetail} screenOptions={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <ActivityIndicator size="small"></ActivityIndicator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

