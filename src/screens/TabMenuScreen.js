/**
* Tab Menu Screen
* Created by Emmanuella Albuquerque on 2023/01/31.
*/

import React from "react";
import { HomeScreen } from './HomeScreen';
import { WatchedShowsScreen } from './WatchedShowsScreen';
import { SearchScreen } from './SearchScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function TabMenuScreen({ navigation }) {
  
  function handleTabIcons({ route }) {
    return ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Watched') {
          iconName = 'forward';
        } else if (route.name === 'Search') {
          iconName = 'search1';
        }

        return <AntDesign name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    });
  }

  return (
    <Tab.Navigator screenOptions={handleTabIcons}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Watched" component={WatchedShowsScreen} />
    </Tab.Navigator>
  );
}
