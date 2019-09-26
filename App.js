import * as React from 'react';
import { View, Text } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AppContainer } from './settings/Routers';

// begin firebase
import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyC15_R6EXK0cCt0s5aPj6YVoVlTXTH_yFc",
  authDomain: "foodapp-972b5.firebaseapp.com",
  databaseURL: "https://foodapp-972b5.firebaseio.com",
  projectId: "foodapp-972b5",
  storageBucket: "foodapp-972b5.appspot.com",
  messagingSenderId: "269797104807",
  appId: "1:269797104807:web:8effd573cec9de90"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// end firebase

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        signedIn: false,
        isReady: false,
    };
  }

  async _cacheResourcesAsync() {

    const images = [
      require('./assets/splash.png'),
    ];

    const fonts = [
      {
        'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
      },
      {
        'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
      },
      {
        'lato-light': require('./assets/fonts/Lato-Light.ttf'),
      }
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    const cacheFonts = fonts.map((font) => {
      return Font.loadAsync(font);
    });

    return Promise.all([...cacheImages, ...cacheFonts])

  }

  render() {

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <AppContainer />;

  }

}