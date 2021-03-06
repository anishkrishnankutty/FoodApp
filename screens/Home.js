
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "uu",
      password: "tt"
    };
  }



  render() {
   
      var user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
      
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.
      }
  
    return (
      <View style={styles.container}>
     <ImageBackground source={{uri: 'https://foodappbuckets.s3.us-east-2.amazonaws.com/app.jpg'}} style={{width: '100%', height: '100%'}}>
    

     <View >
     <TouchableOpacity onPress={()=>this.displayuser()}>
                <View >
                    <Text style={styles.registerButton} >Create your account</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View >
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        
        <Text></Text>
        <Text></Text>
        <Text style={styles.textStyle}> Welcome Home</Text>
        <Text style={styles.textStyle}> {email}</Text>
       
      
    </View>
   
        
       
 
        </ImageBackground>
       
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
    }

})