import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import * as firebase from 'firebase';

export class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('user_token');
        let jsonUser = JSON.parse(userToken);
        if(userToken) {
            firebase.auth().signInWithEmailAndPassword(
                jsonUser.email,
                jsonUser.password
            ).then(
                async (details) => {
                    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
                }
            ).catch((error) => {
                AsyncStorage.removeItem(USER_KEY)
            });
        }
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
    };

    // Render any loading content that you like here
    render() {
        return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}