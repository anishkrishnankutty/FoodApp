import * as React from 'react';

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
              navigationOptions: {
                header: null,
              },
          },
          SignedOut: {
              screen: SignedOutAppContainer,
              navigationOptions: {
                header: null,
              },
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
