/**
* Show List Component
* Created by Emmanuella Albuquerque on 2023/02/03.
*/

import { Box, Center, Text, FlatList, VStack, Image } from 'native-base';
import { images_URL } from '../services/MovieDbAPIConfig';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export function ShowList({ shows, title, navigation }) {

  function getDetails(item) {
    navigation.navigate('Details', { item });
  }

  function renderShow({ item }) {
    {/* "xs", "sm", "md", "lg", "xl", "2xl" */}
    return (
      <TouchableOpacity onPress={() => {
        getDetails(item);
      } }>
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
        {/* <Text color="#fff">{item.title || item.name}</Text> */}
        </VStack>
      </TouchableOpacity>
    );
  }

  return (
    <Box mt="5">
      <Text fontFamily="Poppins_700Bold" fontSize="2xl" color="white" style={{ marginLeft: 20, marginBottom: 10  }}>
        { title }
      </Text>
      { shows.length ? 
        <FlatList data={shows} horizontal={true} renderItem={renderShow}
        keyExtractor={item => item.id} />
      :
        <Center h={200} w={100} borderRadius={8} backgroundColor="gray.400">
          <AntDesign name="forward" size={24} color="#000" />
        </Center>
      }
    </Box>
  );
}