import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

// begin firebase
import * as firebase from 'firebase';
import { AuthLoadingScreen } from './screens/AuthLoading';
const firebaseConfig = {
  apiKey: "AIzaSyC15_R6EXK0cCt0s5aPj6YVoVlTXTH_yFc",
  authDomain: "foodapp-972b5.firebaseapp.com",
  databaseURL: "https://foodapp-972b5.firebaseio.com",
  projectId: "foodapp-972b5",
  storageBucket: "",
  messagingSenderId: "269797104807",
  appId: "1:269797104807:web:8effd573cec9de90"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// end firebase

/////////////////
// screens
/////////////////
import Register from './screens/Register';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import Profile from './screens/Profile';

/////////////////
// Auth Navigation
/////////////////
export const signedOutNavigation = createStackNavigator(
  {
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Register',
  }
);
/////////////////
// InApp Navigation
/////////////////
export const signedInNavigation = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Profile'
  }
);

const AppStack = signedInNavigation;
const AuthStack = signedOutNavigation;

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));