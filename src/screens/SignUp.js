import { useState } from 'react';
import { Text, Center,  } from 'native-base';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

export function SignUp() {

  const [loading, setLoading] = useState(true);
  const jsCode = `document.querySelector('.settings_panel').style.display = 'none';`;

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
