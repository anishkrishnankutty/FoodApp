import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Heading from '../components/Heading';
import * as firebase from 'firebase';
import "firebase/firestore";

export default class VolunteerDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      enableButton: false,
    };
  }

  componentDidMount() {
    this.checkFood()
  }

  async checkFood(){
    try {
      let data = await firebase.firestore().collection('donations').doc(this.props.navigation.getParam('id'));
      data.onSnapshot((doc) => {
        if(doc.data().retrieved) {
          this.setState({
            enableButton: false
          })
        }else{
          this.setState({
            enableButton: true
          })
        }
      });
    } catch(error) {
      console.log(error);
    }
  }

  async retrievedBy() {
    try {
      let checkFood = await firebase.firestore().collection('donations').doc(this.props.navigation.getParam('id'));
      checkFood.get().then((doc) => {
        if(doc.data().retrieved) {
          Alert.alert('Food has already been selected by another Volunteer');
        }else{
          checkFood.update({
            retrieved: true,
            retrievedBy: firebase.auth().currentUser.uid,
            status: 'Retrieved'
          })
        }
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {

    const { navigation } = this.props;
    const id = navigation.getParam('id', '');
    const image = navigation.getParam('image', '');
    const name = navigation.getParam('name', '');
    const description = navigation.getParam('description', '');

    let button;

    if(this.state.enableButton) {
      button = (
        <View style={{ width: "100%", marginBottom: 10 }}>
          <TouchableOpacity onPress={()=>this.retrievedBy()}>
            <View style={{ padding: 10, backgroundColor: "#FF0000" }}>
              <Heading text="Collect" fontFamily="lato-regular" fontSize={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      );
    }else{
      button = (
        <View />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ width: "100%", height: 200, overflow: 'hidden', position: "relative", backgroundColor: '#F1F1F1' }}>
              <Image
                style={{ width: "100%", height: "100%", position: "absolute", }}
                source={{ uri: image }}
              />
            </View>
            <View style={{ width: "100%", padding: 10 }}>
              <View style={{ width: "100%", marginBottom: 10 }}>
                <Heading text={name} fontFamily="lato-bold" fontSize={30} color="#000000" />
              </View>
              <View style={{ width: "100%", marginBottom: 10 }}>
                <Heading text="Quantity" fontFamily="lato-bold" fontSize={30} color="#000000" />
              </View>
              <View style={{ width: "100%", marginBottom: 10 }}>
                <Heading text={description} fontFamily="lato-regular" fontSize={16} color="#CCCCCC" />
              </View>
              {button}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
