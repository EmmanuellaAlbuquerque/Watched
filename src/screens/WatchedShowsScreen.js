/**
* Watched Shows Screen
* Created by Emmanuella Albuquerque on 2023/02/03.
*/

import { images_URL } from '../services/MovieDbAPIConfig';
import { TouchableOpacity } from "react-native";
import { ShowList } from "../components/ShowList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWatched } from "../services/MovieDbAPIClient";
import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "native-base";
import { useTheme } from '@react-navigation/native';

export function WatchedShowsScreen({ navigation }) {
  const { colors } = useTheme();

  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedSeries, setWatchedSeries] = useState([]);

  async function handleGetWatched(){
    try {
      const session_id = await AsyncStorage.getItem('@session_id');
      const account_id = await AsyncStorage.getItem('@account_id');
      if(session_id !== null) {

        const moviesList = await getWatched(session_id, account_id, 'movies');
        const seriesList = await getWatched(session_id, account_id, 'tv');
        setWatchedMovies(moviesList);
        setWatchedSeries(seriesList);
      }
    } catch(e) {
      console.log("error reading token", e);
    }
  }

  useEffect(() => {
    handleGetWatched();
  }, []);

  return (
  <ScrollView mt="16" ml="2.5">
    <Text fontFamily="Poppins_700Bold" fontSize="3xl" textAlign="center" style={{ color: colors.text }}>
      Assistidos
    </Text>
    <ShowList shows={watchedMovies} title="Filmes" navigation={navigation} />
    <ShowList shows={watchedSeries} title="Séries" navigation={navigation} />
  </ScrollView>
  );
}