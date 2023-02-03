/**
* Details Screen
* Created by Emmanuella Albuquerque on 2023/01/30.
*/

import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Text, AspectRatio, ScrollView, HStack, Center } from "native-base";
import { images_URL } from '../services/MovieDbAPIConfig';

export function DetailsScreen({ navigation, route }) {
  const item = route.params.item;

  function goBack() {
    navigation.goBack();
  }

  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
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
            <Ionicons onPress={goBack} name="arrow-back" size={32} color="white" style={styles.goBack} />
          </LinearGradient>
        </ImageBackground>
      : 
      <Text>Loading</Text>
      }
      </AspectRatio>
      <Center>
        <HStack style={{ width: '100%', justifyContent: "space-evenly" }}>
          { item.media_type ?
          <HStack alignItems="center">
            <Feather name="tv" size={32} color="white" />
            <Text fontSize="3xl" style={styles.movie_info}>
              {item.media_type.toUpperCase()}
            </Text>
          </HStack>
          : 
          <></>
          }

          <HStack alignItems="center">
            <AntDesign name="star" size={32} color="#FFDF00" />
            <Text fontSize="3xl" style={styles.movie_info}>
              {item.vote_average.toFixed(1)}
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="4xl" style={styles.name} >{item.name}</Text>
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
    fontWeight: "bold", 
    color: '#fff', 
    marginTop: 20 
  },
  
  movie_info: { 
    fontWeight: "bold", 
    color: '#fff',
    marginLeft: 15 
  }
});
