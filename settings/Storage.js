import { AsyncStorage } from 'react-native';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase';
export const USER_KEY = 'user_token';

// check signed in
export const onSignIn = async data => {
    try {
        AsyncStorage.clear();
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log('Storage.js - error on onSignIn');
    }
};

// signing out process
export const onSignOut = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.log('Storage.js - error on onSignOut');
    }
};

// signing in process
export const isSignedIn = (coordinates) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY).then(res => {
            let jsonUser = JSON.parse(res);
            if (res) {
                if (jsonUser.provider) {
                    firebase.auth().signInWithCredential(jsonUser.credential).then(
                        async (details) => {
                            resolve(true);
                        }
                    ).catch((error) => {
                        AsyncStorage.removeItem(USER_KEY)
                    });
                } else {
                    firebase.auth().signInWithEmailAndPassword(
                        jsonUser.email,
                        jsonUser.password
                    ).then(
                        async (details) => {
                            resolve(true);
                        }
                    ).catch((error) => {
                        AsyncStorage.removeItem(USER_KEY)
                    });
                }
            } else {
                resolve(false);
            }
        }).catch(err => reject(err));
    });
};