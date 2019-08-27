import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './settings/Routers';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC15_R6EXK0cCt0s5aPj6YVoVlTXTH_yFc",
  authDomain: "foodapp-972b5.firebaseapp.com",
  databaseURL: "https://foodapp-972b5.firebaseio.com",
  projectId: "foodapp-972b5",
  storageBucket: "",
  messagingSenderId: "269797104807",
  appId: "1:269797104807:web:8effd573cec9de90"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return <Router />;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
