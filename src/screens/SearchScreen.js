/**
* Search Screen
* Created by Emmanuella Albuquerque on 2023/02/13.
*/

import React, { useState } from "react";
import { Text, Center, Input, Icon, ScrollView, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { searchAll } from "../services/MovieDbAPIClient";
import { ShowList } from "../components/ShowList";

export function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [TVShows, setTVShows] = useState([]);
  const [movieShows, setMovieShows] = useState([]);
  
  async function getAllShowsByQuery() {
    console.log(query)
    const series = await searchAll(query, 'tv');
    const movies = await searchAll(query, 'movie');
    setTVShows(series);
    setMovieShows(movies);
  }

  return (
    <ScrollView>
      <Center mt={20}>
        <Box w={'85%'}>
          <Text 
            fontSize="3xl" 
            fontFamily="Poppins_600SemiBold"
            mb={4}
            style={{ color: '#88240E' }}>
              Encontre Filmes, Séries de TV e mais...
          </Text>

          <Input size="2xl" h={'16'}
            placeholder="Nome de usuário" 
            color='#fff'
            focusOutlineColor='rgba(136, 36, 14, 0.7)'
            borderColor='#333'
            variant="rounded"
            _focus={{
              bg: 'rgba(136, 36, 14, 0.10)'
            }}
            InputLeftElement={<Icon as={<MaterialIcons name="search" />} 
              size={7} ml="4" color="muted.400" 
            />}
            onChangeText={(text) => {
              setQuery(text);
              getAllShowsByQuery(query);
            }}
          />

          {
            query ? <Text fontFamily="Poppins_300Light" fontSize="2xl" color="white" mt={5}>
            Pesquisa por <Text fontFamily="Poppins_700Bold" >{`"${query}"`}</Text>
          </Text> : <></>
          }

          {
            TVShows.length && query ? <ShowList shows={TVShows} title="Séries" media_type="tv" navigation={navigation} /> : <></>
          }

          {
            movieShows.length && query ? <ShowList shows={movieShows} title="Filmes" media_type="movie" navigation={navigation} style={{ paddingBottom: 50 }}  /> : <></>
          }
        </Box>
      </Center>
    </ScrollView>
  );
}
