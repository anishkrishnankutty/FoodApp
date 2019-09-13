import * as React from 'react';

import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';

/////////////////
// screens
/////////////////
import Register from '../screens/Register';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Profile from '../screens/Profile';

/////////////////
// root Navigation
/////////////////
export const RootAppContainer = (signedIn = false) => {
  const rootnavigation = createSwitchNavigator(
    {
      SignedIn: {
        screen: SignInAppContainer,
      },
      SignedOut: {
        screen: SignedOutAppContainer,
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
    }
  );
  return createAppContainer(rootnavigation);
};

/////////////////
// Auth Navigation
/////////////////
const signedOutNavigation = createStackNavigator(
  {
    Register: {
      screen: Register,
    },
    Login: {
      screen: Login,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    initialRouteName: 'Register',
  }
);
/////////////////
// InApp Navigation
/////////////////
const signedInNavigation = createStackNavigator(
  {
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Profile'
  }
);

export const SignedOutAppContainer = createAppContainer(signedOutNavigation);
export const SignInAppContainer = createAppContainer(signedInNavigation);
export default createAppContainer(signedOutNavigation);
