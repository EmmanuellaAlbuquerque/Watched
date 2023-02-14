/**
* Details Screen
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, View, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Text, AspectRatio, ScrollView, HStack, Center, AddIcon, MinusIcon, InfoOutlineIcon, Stack, VStack, Alert, Divider } from "native-base";
import { images_URL } from '../services/MovieDbAPIConfig';
import { getShowStatus, saveWatched, removeWatchedShow } from '../services/MovieDbAPIClient';
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export function DetailsScreen({ navigation, route }) {
  const [item, setItem] = useState(route.params.item);

  const media_type = item.media_type;

  const { session_id, account_id } = useContext(AuthContext);
  const [isShowAddedToWatched, setIsShowAddedToWatched] = useState(false);
  const [wasShowWatched, setWasShowWatched] = useState(false);

  console.log(item)

  function goBack() {
    navigation.goBack();
  }

  async function AddToWatched() {
    const resp = await saveWatched(session_id, account_id, media_type, item.id);

    if (resp) {

      setIsShowAddedToWatched(true);
      setWasShowWatched(true);

      setTimeout(() => {
        setIsShowAddedToWatched(false);
      }, 2 * 1000);
    }
  }

  async function removeFromWatched() {
    const resp = await removeWatchedShow(session_id, account_id, media_type, item.id);

    if (resp) {
      setWasShowWatched(false);
    }
  }

  async function wasWatched() {
    const watched = await getShowStatus(session_id, item.id, media_type);

    if (watched) {
      setWasShowWatched(true);
    }
  }

  useEffect(() => {
    wasWatched();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
      {
        isShowAddedToWatched && 
        <Alert w="100%" variant="solid" colorScheme="success" status="success" mt={statusBarHeight}>
          <HStack alignItems="center" space={2}>
            <Alert.Icon />
            <Text color="warmGray.50" fontFamily="Poppins_500Medium">
              Adicionado com sucesso
            </Text>
          </HStack>
        </Alert>
      }

      <AspectRatio w="100%" ratio={4 / 5.5}>
      {/* re `16/9`, `16/10`, `9/16`, `4/3` */}
      { item ? 
        <ImageBackground source={{
          uri: `${images_URL}${item.poster_path}`
        }}
        >
          <LinearGradient style={{ flex: 1 }} colors={['transparent', 'transparent', 'black']}>
            <View style={{ flex: 1 }}>
            </View>
            <Ionicons onPress={goBack} name="arrow-back" size={32} color="gray" style={styles.goBack} />

            {
              wasShowWatched ? 
              <TouchableOpacity style={styles.button} onPress={removeFromWatched}>
                <Center>
                  <MinusIcon size="8" color="#fff" />
                  <Text color="#fff">Remover</Text>
                </Center>
             </TouchableOpacity>
              :
              <TouchableOpacity style={styles.button} onPress={AddToWatched}>
                <Center>
                  <AddIcon size="8" color="#fff" />
                  <Text color="#fff">Já assisti</Text>
                </Center>
            </TouchableOpacity>
            }
          </LinearGradient>
        </ImageBackground>
      : 
      <Text>Loading</Text>
      }
      </AspectRatio>
      <Center>
        <HStack style={{ width: '100%', justifyContent: "space-evenly" }}>
          { item.media_type == 'movie' ?
          <HStack alignItems="center">
            <Feather name="tv" size={32} color="white" />
            <Text fontSize="3xl" style={styles.movie_info}>
              Filme
            </Text>
          </HStack>
          :
          <HStack alignItems="center">
            <Feather name="tv" size={32} color="white" />
            <Text fontSize="3xl" style={styles.movie_info}>
              Série
            </Text>
          </HStack>
          }
          <HStack alignItems="center">
            <AntDesign name="star" size={32} color="#FFDF00" />
            <Text fontSize="3xl" style={styles.movie_info}>
              {item.vote_average.toFixed(1)}
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="4xl" style={styles.name} >{item.name || item.title}</Text>
        <Text fontSize="md" style={styles.overview} >{item.overview}</Text>
      </Center>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  goBack: {
    position: "absolute", 
    top: 0, 
    left: 0, 
    margin: 50, 
    marginLeft: 30
  },

  overview: { 
    color: 'rgba(255, 255, 255, 0.7)', 
    padding: 20, 
    textAlign: "justify" 
  },

  name: { 
    color: '#88240E', 
    marginTop: 20,
    fontFamily: 'Poppins_700Bold' 
  },
  
  movie_info: { 
    fontWeight: "bold",
    color: '#fff',
    marginLeft: 15 
  },

  button: {  
    marginBottom: 70
  },
});
