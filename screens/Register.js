import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker, ImageBackground, Image, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";
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
      userid: "",
      userType: "",
      volunteer: false,
      ngoId: "",
      ngoName: "",
      location: "",
      loading: true,
      loadingNgos: false,
      firestoreNGOs: [],
      firestoreLocations: [],
    };
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    this.getNGO();
    this.getLocation();
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };

  register() {
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
    ).then(
      (response) => {
        let currentUser = firebase.auth().currentUser;
        let databaseUsers = firebase.firestore().collection('users');
        currentUser.sendEmailVerification().then(() => {
          databaseUsers.doc(currentUser.uid).set({
            name: this.state.name,
            email: this.state.email,
            userid: currentUser.uid,
            contact: this.state.contact,
            usertype: this.state.userType,
            volunteer: this.state.volunteer,
            ngoid: this.state.ngoId,
            ngoname: this.state.ngoName,
            location: this.state.location,
          })
          setTimeout(() => {
            Alert.alert('You are succesfully registered. Please check your mailbox and verify your email address.');
          }, 1000);
        }).catch(function (error) {
          setTimeout(() => {
            Alert.alert(error.message);
          }, 1000);
        });

      },
      (error) => {
        setTimeout(() => {
          Alert.alert(error.message);
        }, 1000);
      }
    );
  }

  onPickerChangeUser(text) {
    try {
      this.setState({
        userType: text
      },()=>{
        if(text == "Volunteer") {
          this.setState({ 
            show: true, 
            volunteer: true, 
          });
        }else{
          this.setState({ 
            show: false, 
            volunteer: false, 
            ngoId: '', 
            ngoName: '' 
          });
        }
      })
    } catch(error) {
      console.log(error);
    }
  }

  onPickerChangeNGO(text, index) {
    try {
      this.setState({
        ngoId: text,
        ngoName: this.state.firestoreNGOs[index].label,
      })
    } catch(error) {
      console.log(error);
    }
  }

  onPickerChangeLocation(text, index) {
    try {
      let createString = "/locations/" + this.state.firestoreLocations[index].value;
      this.setState({
        location: createString,
      })
    } catch(error) {
      console.log(error);
    }
  }

  async getNGO() {
    try {
      let array = [];
      let data = await firebase.firestore().collection('ngo');
      data = data.get();
      data.then((response)=>{
        response.docs.map((doc)=>{
          let createObject = {
            label: doc.data().name,
            value: doc.id
          };
          array.push(createObject);
        })
        this.setState({
          firestoreNGOs: array
        })
      })
    } catch(error) {
      console.log(error);
    }
  }

  async getLocation() {
    try {
      let array = [];
      let data = await firebase.firestore().collection('locations');
      data = data.get();
      data.then((response)=>{
        response.docs.map((doc)=>{
          let createString = doc.data().state + " | " + doc.data().district
          let createObject = {
            label: createString,
            value: doc.id
          };
          array.push(createObject);
        })
        this.setState({
          firestoreLocations: array
        },()=>{
          this.setState({
            loading: false 
          })
        })
      })
    } catch(error) {
      console.log(error);
    }
  }

  render() {

    let pickerNGOS;
    let pickerLocations;

    const placeholderLocation = {
      label: 'Choose your state and district',
      value: null,
      color: '#9EA0A4',
    };

    const placeholder = {
      label: 'Choose an NGO that you wish to work with?',
      value: null,
      color: '#9EA0A4',
    };

    const UserType = {
      label: 'I want to register as a',
      value: null,
      color: '#9EA0A4',
    };

    if(this.state.loading) {
      return (
        <View style={{  flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      )
    }

    if(this.state.loadingNgos){
      pickerNGOS = (
        <View style={styles.formContainer}>
          <View>
            <ActivityIndicator />
          </View>
        </View>
      )
    }else{
      if(this.state.firestoreNGOs.length > 0){
        pickerNGOS = (
          <View style={styles.formContainer}>
              <View style={styles.pickerStyle} >
                <RNPickerSelect placeholder={placeholder}
                  onValueChange={(text, index)=>this.onPickerChangeNGO(text, index)}
                  style={pickerSelectStyles}
                  items={this.state.firestoreNGOs}
                />
            </View>
          </View>
        )
      }
    }

    if(this.state.firestoreLocations.length > 0){
      pickerLocations = (
        <View style={styles.formContainer}>
            <View style={styles.pickerStyle} >
              <RNPickerSelect placeholder={placeholderLocation}
                onValueChange={(text, index)=>this.onPickerChangeLocation(text, index)}
                style={pickerSelectStyles}
                items={this.state.firestoreLocations}
              />
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ImageBackground source={{ uri: 'https://foodappbuckets.s3.us-east-2.amazonaws.com/app.jpg' }} style={{ width: '100%', height: '100%' }}>
            <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
              <View style={{ width: "100%" }}>
                <Text style={styles.textStyle}>Sign up to Food Bags</Text>
              </View>
              <View style={styles.pickerStyle} >
                  <RNPickerSelect placeholder={UserType}
                    style={pickerSelectStyles}
                    onValueChange={(text)=>this.onPickerChangeUser(text)}
                    value={this.state.state}
                    items={[
                      { label: 'Volunteer', value: 'Volunteer' },
                      { label: 'Donor', value: 'Donor' },

                    ]}
                  />
              </View>

              {this.state.show ? (
                pickerNGOS
              ) : null}

              {pickerLocations}

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
              <View style={styles.formContainer}>
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