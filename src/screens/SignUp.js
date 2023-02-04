import { WebView } from 'react-native-webview';

export function SignUp() {

  const jsCode = `document.querySelector('.settings_panel').style.display = 'none';`;

  return (
    <WebView
      source={{ uri: 'https://www.themoviedb.org/signup' }}
      originWhitelist={['*']}
      javaScriptEnabledAndroid={true}
      injectedJavaScript={jsCode}
    />
  );
}
