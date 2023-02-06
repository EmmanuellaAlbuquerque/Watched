import { Text, Center, Input, Stack, Icon, Pressable, Image, Box } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import logo from '../assets/images/logo.png';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getNewToken, validateWithLogin } from '../services/MovieDbAPIClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSession } from '../services/MovieDbAPIClient';
import { getAccountInfo } from "../services/MovieDbAPIClient";

export function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(true);

  function handlePasswordButtonClick() {
    setPasswordVisible(!passwordVisible);
  }

  async function storeUserInfo({ request_token, session_id, account_id }) {
    try {

      // Store Token
      await AsyncStorage.setItem('@request_token', request_token);

      // Store Session Id
      await AsyncStorage.setItem('@session_id', session_id);

      // Store User Account Id
      await AsyncStorage.setItem('@account_id', account_id);

    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogin(username, password) {
    let request_token = await getNewToken();
    let success = await validateWithLogin(username, password, request_token);

    if (success) {

      // Create Session
      const session_id = await createSession(request_token);

      // Get Account Info
      const account_id = await getAccountInfo(session_id);

      // Save User Info
      await storeUserInfo({ request_token, session_id, account_id: String(account_id) });

      if (session_id) {
        navigation.navigate('TabMenu')
      }
    }
    else {
      // setShowAlert(true);
      Alert.alert('Tente novamente!', 
      'Seu nome de usuário ou sua senha estão incorretos.');
    }
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    // position="absolute" zIndex={1} top="10%"
    <Box style={{ flex: 1 }}>
      <Center style={{ flex: 1 }}>
        {/* "xs", "sm", "md", "lg", "xl", "2xl" */}
        <Image 
          source={logo} 
          alt="logo" 
          mb="12"
          size="sm"
          w="100%"
        />
        <Stack space={4} w="85%">
        <Text fontSize="4xl" fontFamily="Poppins_200ExtraLight" style={{ color: colors.text }}>Entrar</Text>
          <Input size="2xl" h={'16'}
            placeholder="Nome de usuário" 
            color={colors.text}
            InputLeftElement={<Icon as={<MaterialIcons name="person" />} 
              size={7} ml="4" color="muted.400" 
            />}
            onChangeText={setUsername}
          />
          <Input size="2xl" h={'16'}
            placeholder="Senha"
            color={colors.text} 
            type={passwordVisible ? "text" : "password"}
            InputLeftElement={<Pressable 
              onPress={handlePasswordButtonClick}
            >
              <Icon as={<MaterialIcons 
                name={ passwordVisible ? "visibility" : "visibility-off" } 
              />} 
            size={7} ml="4" color="muted.400" 
            /></Pressable>}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={() => handleLogin(username, password)} > 
            <Center>
              <Text fontSize="xl" fontFamily="Poppins_700Bold" >Entrar</Text>
            </Center>
          </TouchableOpacity>
          <Text 
            textAlign="right" 
            mr="2"
            fontSize="md"
            style={{ color: colors.text }}
            onPress={handleSignUp}
            fontFamily="Poppins_400Regular"
          > Não tem conta?  <Text 
                fontFamily="Poppins_400Regular" 
                underline 
                fontSize="md"
                style={{ color: colors.text }}
                >
                Cadastre-se
              </Text>
          </Text>
        </Stack>
      </Center>
    </Box>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 8
  }
});
