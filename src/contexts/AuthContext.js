import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext({});


export function AuthProvider({ children }) {
  const [authObject, setAuthObject] = useState({});

  async function getUserInfo(){
    try {
      const session_id = await AsyncStorage.getItem('@session_id');
      const account_id = await AsyncStorage.getItem('@account_id');
  
      if(session_id !== null) {
        setAuthObject({
          session_id: session_id,
          account_id: account_id
        })
      }
    } catch(e) {
      console.log("error reading token", e);
    }
  }

  useEffect(() => {
    getUserInfo(authObject);
  }, []);

  return (
    <AuthContext.Provider value={authObject}>
      {children}
    </AuthContext.Provider> 
  )
}
