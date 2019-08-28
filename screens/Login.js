import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

login(){

  firebase.auth().signInWithEmailAndPassword(
    this.state.email, 
    this.state.password
  ).then(
    (details) => {
      if(details.user.emailVerified === true) {
        this.setState({
          uid: details.user.uid,
          loading: false
        },()=>{
          this.props.navigation.navigate('Home')
        })
      }else{
        this.setState({
          loading: false
        },()=>{
          firebase.auth().currentUser.sendEmailVerification().then(function() {
            Alert.alert('Your email address has not been verified. We have just sent you the verification email again.')
          }).catch(function(error) {
            setTimeout(() => {
              Alert.alert(error.message);
            }, 1000);
          });
        })
      }
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
        <Text> Login

        </Text>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text)=>this.setState({email:text})} />
        </View>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Password" onChangeText={(text)=>this.setState({password:text})} />
        </View>
        <View style={styles.formContainer}>
            <TouchableOpacity onPress={()=>this.login()}>
                <View style={styles.loginButton}>
                    <Text>Login</Text>
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
  loginButton: {
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