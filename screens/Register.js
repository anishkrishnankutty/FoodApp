import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    };
  }

  register() {
    firebase.auth().createUserWithEmailAndPassword(
        this.state.email, 
        this.state.password
      ).then(
        (response) => {
            console.log(response);
            firebase.auth().currentUser.sendEmailVerification().then(function() {
              setTimeout(() => {
                Alert.alert('You are succesfully registered. Please check your mailbox and verify your email address.');
              }, 1000);
            }).catch(function(error) {
              setTimeout(() => {
                Alert.alert(error.message);
              }, 1000);
            });
        }, 
        (error) => {
          this.setState({
            loading: false
          },()=>{
            setTimeout(() => {
              Alert.alert(error.message);
            }, 1000);
          })
        }
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Register Screen

        </Text>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text)=>this.setState({email:text})} />
        </View>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Password" onChangeText={(text)=>this.setState({password:text})} />
        </View>
        <View style={styles.formContainer}>
            <TouchableOpacity onPress={()=>this.register()}>
                <View style={styles.registerButton}>
                    <Text>register</Text>
                </View>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
            <View style={styles.loginButton}>
                <Text>Go To Login Screen</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
            <View style={styles.loginButton}>
                <Text>Forgot Password</Text>
            </View>
        </TouchableOpacity>
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