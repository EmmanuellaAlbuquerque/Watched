/**
* Home Screen
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

import React, { useEffect, useState } from "react";
import { getTrendingTVShows } from '../services/MovieDbAPIClient';
import { images_URL } from '../services/MovieDbAPIConfig';
import { ImageBackground, View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, FlatList, VStack, Text, Box, AspectRatio, 
  ScrollView, InfoOutlineIcon, HStack, Center, AddIcon } from "native-base";


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
    navigation.navigate('Details', { topShow });
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

              <HStack>
                  <TouchableOpacity style={styles.button} onPress={() => {
                    
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
      <Text bold fontSize="2xl" color="white" style={{ marginLeft: 20, marginBottom: 10  }}>
        Populares na TV
      </Text>
      <FlatList data={trending} horizontal={true} renderItem={({
        item
      }) =>
      <VStack space={2} alignItems="center" style={{ padding: 5 }} >
          <Image source={{
            uri: `${images_URL}${item.poster_path}`
            }} 
            alt="tv_show" 
            size="xl"
            resizeMode="cover"
            height="200" 
            width="100"
            borderRadius={8}
          />
          <Text color="#fff">{item.name}</Text>
      </VStack>
      }
      keyExtractor={item => item.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%', 
    backgroundColor: "transparent", 
    marginBottom: 70
  }
});