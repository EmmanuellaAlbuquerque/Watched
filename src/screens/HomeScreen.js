/**
* Home Screen
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

import React, { useEffect, useState } from "react";
import { getTrendingTVShows } from '../services/MovieDbAPIClient';
import { images_URL } from '../services/MovieDbAPIConfig';
import { ImageBackground, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, FlatList, VStack, Text, Box, AspectRatio, 
  ScrollView, InfoOutlineIcon, HStack, Center, AddIcon } from "native-base";
import { ShowList } from "../components/ShowList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign  } from '@expo/vector-icons';

export function HomeScreen({ navigation }) {

  const [topShow, setTopShow] = useState();
  const [trending, setTrending] = useState([]);

  useEffect(() => {

    (async () => {
      let top = await getTrendingTVShows();
      setTopShow(top[0]);
      setTrending(top.splice(1));
    })();

  }, []);

  function getDetails(topShow) {
    navigation.navigate('Details', { item: topShow });
  }

  function logOut() {
    AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(console.log('logout.'));

    navigation.navigate('Login');
  }

  function AddToWatched() {

  }

  return (
    <ScrollView style={{ backgroundColor: '#000' }} >
      <Box>
        <AspectRatio w="100%" ratio={4 / 5.5}>
        {/* re `16/9`, `16/10`, `9/16`, `4/3` */}
        { topShow ? 
          <ImageBackground source={{
            uri: `${images_URL}${topShow.poster_path}`
            }}
          >
            <LinearGradient style={{ flex: 1 }} colors={['transparent', 'transparent', 'black']}>
              <View style={{ flex: 1 }}>
              </View>
              <Center style={styles.logOut}>
                <AntDesign onPress={logOut} name="logout" size={32} color="white" />
                <Text color="#fff">Sair</Text>
              </Center>

              <HStack>
                  <TouchableOpacity style={styles.button} onPress={() => {
                    AddToWatched()
                  } }>
                    <Center>
                      <AddIcon size="8" color="#fff" />
                      <Text color="#fff">Já assisti</Text>
                    </Center>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={() => {
                    getDetails(topShow);
                  } }>
                    <Center>
                      <InfoOutlineIcon size="8" color="#fff" />
                      <Text color="#fff">Saiba mais</Text>
                    </Center>
                  </TouchableOpacity>
              </HStack>
            </LinearGradient>
          </ImageBackground>
        : 
        <Center>
          <Text color="white">Loading</Text>
        </Center>
        }
        </AspectRatio>
      </Box>
      <ShowList shows={trending} title="Populares na TV" navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%', 
    backgroundColor: "transparent", 
    marginBottom: 70
  },

  logOut: {
    position: "absolute", 
    top: 20, 
    right: 0, 
    margin: 50
  },
});