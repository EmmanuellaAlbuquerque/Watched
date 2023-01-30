import React, { useEffect, useState } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { HomeScreen } from './src/screens/HomeScreen';

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={'transparent'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
