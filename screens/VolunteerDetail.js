import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Heading from '../components/Heading';
import * as firebase from 'firebase';
import "firebase/firestore";

export default class VolunteerDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {

    const { navigation } = this.props;
    const id = navigation.getParam('id', '');
    const image = navigation.getParam('image', '');
    const name = navigation.getParam('name', '');
    const description = navigation.getParam('description', '');

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ width: "100%", height: 200, overflow: 'hidden', position: "relative" }}>
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
                <Heading text={description} fontFamily="lato-regular" fontSize={16} color="#CCCCCC" />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
