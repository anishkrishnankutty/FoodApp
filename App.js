import * as React from 'react';
import { Font } from 'expo';
import Router from './settings/Routers';
import { isSignedIn, hasSkipped } from './settings/Storage';
import { AppLoading } from 'expo';

// begin firebase
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
// end firebase

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      fontLoaded: true
    };
  }

  async componentDidMount() {
    this.setState({ fontLoaded: true },()=>{
      isSignedIn()
        .then((res) => {
          console.log(res);
          if(res) {
            this.setState({ signedIn: res})
          }else{
            this.setState({ signedIn: false})
          }
        }).catch(err => alert(err.message));
    });
  }

  render() {
    
    return <Router />;
    
  }
}