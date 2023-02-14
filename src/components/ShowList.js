/**
* Show List Component
* Created by Emmanuella Albuquerque on 2023/02/03.
*/

import { Box, Center, Text, FlatList, VStack, Image } from 'native-base';
import { images_URL } from '../services/MovieDbAPIConfig';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Loading from '../assets/images/loading.gif';

export function ShowList({ shows, title, navigation, media_type, ...rest }) {

  function getDetails(item) {
    let show = {
      ...item
    }

    if (media_type) {
      show = { ...show, media_type }
    }

    navigation.navigate('Details', { item: show });
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
          alt="show" 
          size="xl"
          resizeMode="cover"
          height="200" 
          width="100"
          borderRadius={8}
          defaultSource={Loading}
        />
        {/* <Text color="#fff">{item.title || item.name}</Text> */}
        </VStack>
      </TouchableOpacity>
    );
  }

  return (
    <Box mt="5" {...rest}>
      <Text fontFamily="Poppins_700Bold" fontSize="2xl" color="#88240E" style={{ marginLeft: 20, marginBottom: 10  }}>
        { title }
      </Text>
      { shows.length ? 
        <FlatList data={shows} horizontal={true} renderItem={renderShow}
        keyExtractor={item => item.id} />
      :
        <Center h={200} w={100} borderRadius={8} bg="gray.400">
          <AntDesign name="forward" size={24} color="#000" />
        </Center>
      }
    </Box>
  );
}