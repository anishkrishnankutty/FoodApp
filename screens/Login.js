import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { onSignIn } from '../settings/Storage';
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
    const { navigate } = this.props.navigation;
    firebase.auth().signInWithEmailAndPassword(
      this.state.email, 
      this.state.password
    ).then(
      (details) => {
        if(details.user.emailVerified === true) {
          onSignIn({
            email: this.state.email,
            password: this.state.password,
            uid: details.user.uid
          }).then(() => {        
            setTimeout(()=>{
              navigate('AuthLoading');
            }, 1000);
          });
        }else{
          firebase.auth().currentUser.sendEmailVerification().then(function() {
            Alert.alert('Your email address has not been verified. We have just sent you the verification email again.')
          }).catch(function(error) {
            setTimeout(() => {
              Alert.alert(error.message);
            }, 1000);
          });
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
        <SafeAreaView>
          <ImageBackground source={{uri: 'https://foodappbuckets.s3.us-east-2.amazonaws.com/app.jpg'}} style={{width: '100%', height: '100%'}}>
            <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
              <View style={{ width: "100%" }}>
                <Text style={styles.textStyle}> Sign in to Food Bags</Text>
              </View>
              <View style={styles.formContainer}>
                  <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text)=>this.setState({email:text})} />
              </View>
              <View style={styles.formContainer}>
                  <TextInput  secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={(text)=>this.setState({password:text})} />
              </View>
              <View style={{ width: "100%" }}>
                  <TouchableOpacity onPress={()=>this.login()}>
                      <View >
                          <Text style={styles.registerButton} >Sign in</Text>
                      </View>
                  </TouchableOpacity>
              </View>
              <View style={{ width: "100%", marginTop: 10 }}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                    <View >
                        <Text style={styles.loginButton} >New to Food App? Create an account here</Text>
                    </View>
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%", marginTop: 10 }}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                    <View >
                        <Text style={styles.loginButton} >Forgot Password?</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCC",
    height: 100,
  },
  formContainer: {
    width: "100%",
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 12
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'black',
    fontSize: 20,
    overflow: 'hidden',
    padding: 10,
    textAlign:'left',
  },
  registerButton: {
    backgroundColor: '#008080',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
  loginButton: {
    backgroundColor: '#C0C0C0',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'black',
    fontSize: 14,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
})