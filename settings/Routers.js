import * as React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

/////////////////
// screens
/////////////////
import { AuthLoadingScreen } from '../screens/AuthLoading';
import Register from '../screens/Register';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Volunteer from '../screens/Volunteer';
import VolunteerDetail from '../screens/VolunteerDetail';
import Donor from '../screens/Donor';
import Admin from '../screens/Admin';
import Profile from '../screens/Profile';

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////// VOLUNTEER LANDING
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
export const volunteerLanding = createStackNavigator(
  {
    Volunteer: {
      screen: Volunteer,
      navigationOptions: {
        header: null,
      },
    },
    VolunteerDetail: {
      screen: VolunteerDetail,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Volunteer'
  }
);

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
export const signedInNavigationDonor = createStackNavigator(
  {
    Donor: {
      screen: Donor,
      navigationOptions: {
        header: null,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Donor'
  }
);

export const signedInNavigationVolunteer = createBottomTabNavigator(
  {
    Volunteer: {
      screen: volunteerLanding,
      navigationOptions: {
        header: null,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Volunteer'
  }
);

export const signedInNavigationAdmin = createStackNavigator(
  {
    Admin: {
      screen: Admin,
      navigationOptions: {
        header: null,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'Admin'
  }
);

const AppStackDonor = signedInNavigationDonor;
const AppStackVolunteer = signedInNavigationVolunteer;
const AppStackAdmin = signedInNavigationAdmin;
const AuthStack = signedOutNavigation;

export const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AppDonor: AppStackDonor,
    AppVolunteer: AppStackVolunteer,
    AppAdmin: AppStackAdmin,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));