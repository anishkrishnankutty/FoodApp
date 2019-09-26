import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";

export class AuthLoadingScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          uid: '',
          userData: {},
          user: {},
          userToken: '',
      };
      this.redirectUser = this.redirectUser.bind(this);
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    async getUser() {
      try {
        let array = [];
        let data = await firebase.firestore().collection('users').doc(this.state.user.uid);
        data = data.get();
        data.then((response)=>{
          if(response) {
            this.setState({
              userData: response.data()
            },()=>{
                this.redirectUser();
            })
          }
        })
      } catch(error) {
        console.log(error);
      }
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
                    this.setState({
                        user: details.user
                    },()=>{
                        this.getUser();
                    })
                }
            ).catch((error) => {
                AsyncStorage.removeItem('user_token');
                this.props.navigation.navigate('Auth');
            });
        }else{
            AsyncStorage.removeItem('user_token');
            this.props.navigation.navigate('Auth');
        }
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
    };

    redirectUser() {
        if(this.state.userData.usertype === 'Admin' ) {
            this.props.navigation.navigate('AppAdmin');
        } else if(this.state.userData.usertype === 'Donor') {
            this.props.navigation.navigate('AppDonor');
        } else {
            this.props.navigation.navigate('AppVolunteer');
        }
    }

    // Render any loading content that you like here
    render() {
        return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}