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
      };
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
                        this.getUser().then(()=>{
                            if(this.state.userData.usertype === 'Admin' ) {
                                this.props.navigation.navigate(userToken ? 'AppAdmin' : 'Auth');
                            } else if(this.state.userData.usertype === 'Donor') {
                                this.props.navigation.navigate(userToken ? 'AppDonor' : 'Auth');
                            } else {
                                this.props.navigation.navigate(userToken ? 'AppVolunteer' : 'Auth');
                            }
                        });
                    })
                }
            ).catch((error) => {
                AsyncStorage.removeItem(USER_KEY)
            });
        }else{
            this.props.navigation.navigate('Auth');
        }
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
    };

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