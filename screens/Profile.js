import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import * as firebase from 'firebase';
import "firebase/firestore";

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      userData: {},
      locationState: "",
      locationDistrict: ""
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
          },()=>{
            this.getLocation(response.data().location)
          })
        }
      })
    } catch(error) {
      console.log(error);
    }
  }

  async getLocation(location) {
    try {
      let firestoreLocation = await firebase.firestore();
      let data = await firestoreLocation.doc(location);
      data = data.get();
      data.then((response)=>{
        if(response) {
          let locationObject = response.data();
          this.setState({
            locationState: locationObject.state,
            locationDistrict: locationObject.district
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

    let name;
    let email;
    let contact;
    let ngoId;
    let ngoName;
    let userId;
    let userType;
    let locationState;
    let locationDistrict;

    if(this.state.userData.name){
      name = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>Name:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.name}</Text>
        </View>
      )
    }

    if(this.state.userData.email){
      email = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>Email:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.email}</Text>
        </View>
      )
    }

    if(this.state.userData.contact){
      contact = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>Contact:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.contact}</Text>
        </View>
      )
    }

    if(this.state.userData.ngoid){
      ngoId = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>NGO ID:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.ngoid}</Text>
        </View>
      )
    }

    if(this.state.userData.ngoname){
      ngoName = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>NGO NAME:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.ngoname}</Text>
        </View>
      )
    }

    if(this.state.userData.userid){
      userId = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>User ID:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.userid}</Text>
        </View>
      )
    }

    if(this.state.userData.usertype){
      userType = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>User Type:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.usertype}</Text>
        </View>
      )
    }

    if(this.state.userData.location){
      location = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>Location Reference:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.userData.location}</Text>
        </View>
      )
    }

    if(this.state.locationState){
      locationState = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>State:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.locationState}</Text>
        </View>
      )
    }

    if(this.state.locationDistrict){
      locationDistrict = (
        <View style={{ width: "100%", marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ marginRight: 10, }}>District:</Text>
          <Text style={{ flex: 1, flexGrow: 1 }}>{this.state.locationDistrict}</Text>
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ width: "100%", alignItems: "center", justifyContent: "center", paddingTop: 10, paddingBottom: 10 }}>
            <Text style={{ fontSize: 20 }}>PROFILE</Text>
          </View>
          <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
            {name}
            {email}
            {contact}
            {ngoId}
            {ngoName}
            {userId}
            {userType}
            {locationState}
            {locationDistrict}
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
