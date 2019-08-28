import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    };
  }

  
  
  render() {
    return (
      <View style={styles.container}>
        <Text> Welcome Home

        </Text>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    formContainer: {
        width: "100%",
    },
    input: {
        fontSize: 14,
        padding: 10
    },
    registerButton: {
        width: "100%",
        padding: 10,
        backgroundColor: "#FF0000"
    },
    loginButton: {
        width: "100%",
        padding: 10,
        backgroundColor: "#CCC"
    }
})