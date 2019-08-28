import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
    };
  }

  forgotpassword() {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(()=>{
      setTimeout(() => {
        this.setState({
          loading: false
        },()=>{
          setTimeout(() => {
            Alert.alert('A mail has been sent to your email address');
          }, 1000);
        })
      }, 2000);
    }).catch((error)=>{
      setTimeout(() => {
        this.setState({
          loading: false
        },()=>{
          setTimeout(() => {
            Alert.alert(error.message);
          }, 1000);
        });
      }, 2000);
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Forgot Password

        </Text>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text)=>this.setState({email:text})} />
        </View>
  
        <View style={styles.formContainer}>
            <TouchableOpacity onPress={()=>this.forgotpassword()}>
                <View style={styles.registerButton}>
                    <Text>Forgot Password</Text>
                </View>
            </TouchableOpacity>
        </View>
      
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