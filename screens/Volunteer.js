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
  }

  componentDidMount() {
    this.loadDonations()
  }

  async loadDonations() {
    try {
      let array = [];
      let data = await firebase.firestore().collection('donations');
      data = data.get();
      data.then((response)=>{
        response.docs.map((doc)=>{
          array.push(doc.data());
        })
        this.setState({
          data: array
        })
      })
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
            style={{ flex: 1 }}
            data={this.state.data}
            contentContainerStyle={{ padding: 10 }}
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
