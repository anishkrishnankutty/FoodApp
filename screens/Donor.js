import React, { Component } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import CardDonor from '../components/CardDonor';
import { SafeAreaView } from 'react-navigation';
import Heading from '../components/Heading';
import * as firebase from 'firebase';
import "firebase/firestore";
import ModalDonor from '../components/ModalDonor';

const ITEM_WIDTH = Dimensions.get('window').width;

export default class Donor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalOpened: false,
    };
    this.loadYourDonations = this.loadYourDonations.bind(this);
    this.modalState = this.modalState.bind(this);
  }

  componentDidMount() {
    this.loadYourDonations()
  }

  async loadYourDonations() {
    try {
      let data = await firebase.firestore().collection('donations').where('donor', '==', firebase.auth().currentUser.uid);
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

  modalState(state) {
    this.setState({
      modalOpened: state
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ModalDonor visible={this.state.modalOpened} toggleModal={this.modalState} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ width: "100%", padding: 10, borderBottomWidth: 1, borderBottomColor: "#CCC" }}>
            <Heading fontFamily='lato-bold' fontSize={20} text="Food Added" />
          </View>
          <View style={{ width: "100%", padding: 10, borderBottomWidth: 1, borderBottomColor: "#CCC" }}>
            <TouchableOpacity onPress={()=>this.setState({ modalOpened: true })}>
                <View style={{ width: "100%", padding: 10, backgroundColor: "#FF0000" }}>
                    <Heading fontFamily='lato-bold' fontSize={20} text="Add Food Item" />
                </View>
            </TouchableOpacity>
          </View>
          <FlatList
            numColumns={2}
            style={{ flex: 1 }}
            data={this.state.data}
            contentContainerStyle={{ paddingLeft: 5, paddingRight: 5, paddingTop: 15 }}
            keyExtractor={(item, index) => 'donor-list-' + index.toString()}
            renderItem={(data, index) => {
              return <CardDonor object={data.item} navigation={this.props.navigation} key={index} itemWidth={ ITEM_WIDTH / 2 - 5 } />;
            }}
          />
        </SafeAreaView>
      </View>
    );
  }
}
