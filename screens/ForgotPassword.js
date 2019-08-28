
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
     <ImageBackground source={{uri: 'https://foodappbuckets.s3.us-east-2.amazonaws.com/app.jpg'}} style={{width: '100%', height: '100%'}}>
    

     <View >
    
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
        <Text style={styles.textStyle}> Password Reset</Text>
        <Text></Text>
       
    </View>
   
        
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Email Address" onChangeText={(text)=>this.setState({email:text})} />
        </View>
   
        <View >
       
       
       
       
    </View>
        <View>
            <TouchableOpacity onPress={()=>this.forgotpassword()}>
                <View >
                    <Text style={styles.registerButton} >Get Reset Link</Text>
                </View>
            </TouchableOpacity>
        </View>
       
        <View >
        <Text></Text>
        <Text></Text>
        <Text></Text>
      
      
       
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