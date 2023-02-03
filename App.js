import React, { useEffect, useState } from "react";
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeBaseProvider, StatusBar, extendTheme, Text, Center } from "native-base";
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from "./src/screens/LoginScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabMenuScreen } from "./src/screens/TabMenuScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    getAccountInfo();
  }, []);
  
  async function getAccountInfo(){
    try {
      const user_id = await AsyncStorage.getItem('@account_id');

      if(user_id !== null) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    } catch(e) {
      console.log("error reading token", e);
    }
  }

  const defaultTheme = {
    dark: true,
    colors: {
      background: '#000',
      text: '#fff',
    },
  };

  return (
    <NativeBaseProvider config={config} >
      <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={'transparent'} />
      <NavigationContainer theme={defaultTheme}>
        <Stack.Navigator initialRouteName={ isLoggedIn ? 'TabMenu' : 'Login'} screenOptions={{ 
          headerShown: false
          }}>
          <Stack.Screen name="TabMenu" component={TabMenuScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
