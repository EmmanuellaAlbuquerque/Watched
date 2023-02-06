import React, { useCallback, useEffect, useState } from "react";
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeBaseProvider, StatusBar, extendTheme, Text, Center } from "native-base";
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from "./src/screens/LoginScreen";
import { SignUp } from "./src/screens/SignUp";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabMenuScreen } from "./src/screens/TabMenuScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Poppins_300Light, 
  Poppins_500Medium, Poppins_400Regular, 
  Poppins_200ExtraLight, Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from "./src/contexts/AuthContext";

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_200ExtraLight,
    Poppins_300Light, 
    Poppins_500Medium, 
    Poppins_400Regular,
    Poppins_700Bold
  });
  
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

  const fontsLoadedCallback = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const defaultTheme = {
    dark: true,
    colors: {
      background: '#000',
      text: '#fff',
    },
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NativeBaseProvider config={config} onLayout={fontsLoadedCallback}>
        <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={'transparent'} />
        <NavigationContainer theme={defaultTheme}>
          <Stack.Navigator initialRouteName={ isLoggedIn ? 'TabMenu' : 'Login'} screenOptions={{ 
            headerShown: false
            }}>
            <Stack.Screen name="TabMenu" component={TabMenuScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}
