import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";
import { SafeAreaView } from 'react-navigation';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      userData: {}
    };
  }

  componentDidMount() {
    this.load();
  }

  async load() {
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

  async signOut() {
    try {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.name}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.email}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.contact}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.ngoid}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.ngoname}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.userid}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.usertype}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text>{this.state.userData.location}</Text>
            </View>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <TouchableOpacity onPress={()=>this.signOut()}>
                <View style={{ width: "100%", padding: 10, backgroundColor: "#CCC", borderRadius: 5 }}>
                  <Text>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
