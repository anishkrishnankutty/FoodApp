import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker, ImageBackground, Image, TextInput, Alert, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-navigation';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      contact: "",
      userid: ""
    };
    this.ref = firebase.firestore().collection('users');
  }




  register() {
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).then(
      (response) => {
        console.log(response);

        Alert.alert(firebase.auth().currentUser.uid);
        this.setState({ userid: firebase.auth().currentUser.uid });
        this.ref.add({
          name: this.state.name,
          email: this.state.email,
          userid: this.state.userid,
          contact: this.state.contact
        }).then((data) => {
          console.log(`added data = ${data}`);
          this.setState({

            loading: true
          });
        });



        firebase.auth().currentUser.sendEmailVerification().then(function () {



          setTimeout(() => {
            Alert.alert(firebase.auth().currentUser.uid);



            Alert.alert('You are succesfully registered. Please check your mailbox and verify your email address.');
          }, 1000);



        }).catch(function (error) {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 1000);
        });
      },
      (error) => {
        this.setState({
          loading: false
        }, () => {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 1000);
        })
      }
    );
  }


  render() {

    const placeholder = {
      label: 'Select the NGO you belong to?',
      value: null,
      color: '#9EA0A4',
    };

    const UserType = {
      label: 'I want to register as a',
      value: null,
      color: '#9EA0A4',
    };



    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ImageBackground source={{ uri: 'https://foodappbuckets.s3.us-east-2.amazonaws.com/app.jpg' }} style={{ width: '100%', height: '100%' }}>
            <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
              <View style={styles.pickerStyle} >
                  <RNPickerSelect placeholder={UserType}
                    style={pickerSelectStyles}
                    onValueChange={(value) => console.log(value)}
                    items={[
                      { label: 'Volunteer', value: 'Volunteer' },
                      { label: 'Donor', value: 'Donor' },

                    ]}
                  />
              </View>
              <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => this.setState({ name: text })} />
              </View>
              <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text) => this.setState({ email: text })} />
              </View>
              <View style={styles.formContainer}>
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} />
              </View>
              <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Contact Number" onChangeText={(text) => this.setState({ contact: text })} />
              </View>
              <View style={styles.pickerStyle} >
                <RNPickerSelect placeholder={placeholder}
                  onValueChange={(value) => console.log(value)}
                  style={pickerSelectStyles}
                  items={[
                    { label: 'NGO 1', value: 'NGO1' },
                    { label: 'NGO 2', value: 'NGO2' },
                    { label: 'NGO 3', value: 'NGO3' },
                  ]}
                />
              </View>
              <View>
                <TouchableOpacity onPress={() => this.register()}>
                  <View >
                    <Text style={styles.registerButton} >Create your account</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <View >
                    <Text style={styles.loginButton} >Already Have an account? Sign in here!</Text>
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
  },
  formContainer: {
    width: "100%",
    textAlign: 'center',
    borderTopWidth: 1,
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
    textAlign: 'left',
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
    textAlign: 'center',

  },

  textStyle: {



    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',


  },
  pickerStyle: {
    backgroundColor: '#FFFFFF',
    borderColor: 'white',
    borderRadius: 12,
    color: 'black',
    fontSize: 20,
    overflow: 'hidden',
    padding: 13,
    borderTopWidth: 1,
    textAlign: 'left',
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
    textAlign: 'center',

  },
  backgroundImage: {

    flex: 1,
    width: null,
    height: null,

  },

})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20
  },
  inputAndroid: {
    fontSize: 20
  }
});