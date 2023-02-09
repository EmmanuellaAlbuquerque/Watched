/**
* Sign Up Screen (The Movie DB WebView)
* Created by Emmanuella Albuquerque on 2023/02/09.
*/

import { useState } from 'react';
import { Center  } from 'native-base';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

export function SignUp() {

  const [loading, setLoading] = useState(true);
  const jsCode = `
  document.querySelector('.settings_panel').style.display = 'none';
  document.querySelector('.column_content').style.color = '#fff';
  document.querySelector('#main').style.backgroundColor = '#031d33';
  document.querySelector('#signup_form').style.color = '#fff';
  `;

  return (
    <>
      {
        loading && 
        <Center flexGrow={3}>
          <ActivityIndicator size={'large'} />
        </Center>
      }
      <WebView
      source={{ uri: 'https://www.themoviedb.org/signup' }}
      originWhitelist={['*']}
      javaScriptEnabledAndroid={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      injectedJavaScript={jsCode}
      onLoad={() => setLoading(false)}
      opacity={loading ? 0 : 1} // hidden webview
      />
    </>
  );
}
