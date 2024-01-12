/**
* Authentication Context
* Created by Emmanuella Albuquerque on 2023/02/05.
*/

import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSession } from '../services/MovieDbAPIClient';
import { getAccountInfo } from "../services/MovieDbAPIClient";
import { getNewToken, validateWithLogin } from '../services/MovieDbAPIClient';

export const AuthContext = createContext({});


export function AuthProvider({ children }) {
  const [authObject, setAuthObject] = useState({});

  async function signIn(username, password) {
    let request_token = await getNewToken();
    let success = await validateWithLogin(username, password, request_token);

    if (success) {
      // Create Session
      const session_id = await createSession(request_token);
  
      // Get Account Info
      const account_id = await getAccountInfo(session_id);
  
      // Save User Info
      await storeUserInfo({ request_token, session_id, account_id: String(account_id) });

      return true;
    }
    else {
      return false;
    }
  }

  async function storeUserInfo({ request_token, session_id, account_id }) {
    try {

      // Store Token
      await AsyncStorage.setItem('@request_token', request_token);

      // Store Session Id
      await AsyncStorage.setItem('@session_id', session_id);

      // Store User Account Id
      await AsyncStorage.setItem('@account_id', account_id);

      setAuthObject({
        session_id: session_id,
        account_id: account_id
      });
    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{authObject, signIn}}>
      {children}
    </AuthContext.Provider> 
  )
}
