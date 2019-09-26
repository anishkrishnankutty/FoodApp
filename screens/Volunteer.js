import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, FlatList } from 'react-native';
import CardVolunteer from '../components/CardVolunteer';
import { SafeAreaView } from 'react-navigation';
import Heading from '../components/Heading';
import * as firebase from 'firebase';
import "firebase/firestore";

const ITEM_WIDTH = Dimensions.get('window').width;

export default class Volunteer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadDonations = this.loadDonations.bind(this);
  }

  componentDidMount() {
    this.loadDonations()
  }

  async loadDonations() {
    try {
      let data = await firebase.firestore().collection('donations').where('retrieved', '==', false);
      data.onSnapshot((querySnapshot) => {
        let array = [];
        querySnapshot.forEach((doc) => {
          array.push(doc.data());
        });
        this.setState({
          data: array
        })
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ width: "100%", padding: 10, borderBottomWidth: 1, borderBottomColor: "#CCC" }}>
            <Heading fontFamily='lato-bold' fontSize={20} text="Sponsored Food" />
          </View>
          <FlatList
            numColumns={2}
            style={{ flex: 1 }}
            data={this.state.data}
            contentContainerStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 15 }}
            keyExtractor={(item, index) => 'volunteer-list-' + index.toString()}
            renderItem={(data, index) => {
              return <CardVolunteer object={data.item} navigation={this.props.navigation} key={index} itemWidth={ ITEM_WIDTH / 2 - 5 } />;
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}
