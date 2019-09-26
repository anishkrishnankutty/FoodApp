import React, { Component } from 'react';
import { View, Text, Modal, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { SafeAreaView } from 'react-navigation';
import Heading from '../components/Heading';
import * as firebase from 'firebase';
import "firebase/firestore";

export default class ModalDonor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleModal: this.props.toggleModal,
            name: '',
            description: '',
            quantity: 0,
            donor: firebase.auth().currentUser.uid,
            retrieved: 'false',
            imageData: '',
            imageManipulated: ''
        };
        this.addFood = this.addFood.bind(this);
    }

    async addFood() {
        try {
            let data = await firebase.firestore().collection('donations');
            data.add({
                name: this.state.name,
                description: this.state.description,
                quantity: parseFloat(this.state.quantity),
                donor: this.state.donor,
                retrieved: false,
                status: 'Awaiting Volunteer',
            }).then((doc)=>{
                this.uploadImage(this.state.imageManipulated.uri, doc.id).then((response)=> {
                    if(response) {
                        firebase.firestore().collection('donations').doc(doc.id).update({
                            image: response,
                            id: doc.id
                        }).then(()=>{
                            this.state.toggleModal(false);
                        });
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            })
        } catch(error) {
            console.log(error);
        }
    }

    chooseImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            Alert.alert('You have declined the ability to upload an image');
        }else{
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1],
            });
            if(!result.cancelled) {
                this.setState({
                    loading: true
                });
                let manipResult = await ImageManipulator.manipulateAsync(
                    result.uri,[{ resize: { height: 200 } }],
                    { format: 'jpeg', compress: 0.5 }
                );
                const source = { uri: result.uri };
                this.setState({
                    imageData: source,
                    imageManipulated: manipResult 
                })
            }
        }
    }

    uploadImage = async (uri, imageName) => {
        console.log("Upload Image");
        let newImage = imageName.replace(/\@/gi, '_');
        newImage = newImage.replace(/\./gi, '_');
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function(e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const ref = firebase.storage().ref().child('donations/' + newImage);
        const snapshot = await ref.put(blob);
        blob.close();
        return await snapshot.ref.getDownloadURL();

    }

    render() {
        return (
            <Modal transparent={false} visible={this.props.visible} animationType="slide">
                <View style={{ flex: 1 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ width: "100%", padding: 10, borderBottomWidth: 1, borderBottomColor: "#CCC" }}>
                            <Heading fontFamily='lato-bold' fontSize={20} text="Adding Food Item" />
                        </View>
                        <ScrollView style={{ flex: 1, padding: 10 }}>
                            <View style={{ width: "100%", marginBottom: 10 }}>
                                <TextInput placeholder="Enter Product Name" onChangeText={(text)=>this.setState({ name: text })} />
                            </View>
                            <View style={{ width: "100%", marginBottom: 10 }}>
                                <TextInput placeholder="Enter Product Description" onChangeText={(text)=>this.setState({ description: text })} />
                            </View>
                            <View style={{ width: "100%", marginBottom: 10 }}>
                                <TextInput placeholder="Enter Product Quantity" onChangeText={(text)=>this.setState({ quantity: text })} keyboardType={'numeric'} />
                            </View>
                            <View style={{ width: "100%", marginBottom: 10 }}>
                                <Image source={this.state.imageData} style={{ width: 100, height: 100 }} />
                            </View>
                            <View style={{ width: "100%", marginBottom: 10 }}>
                                <TouchableOpacity onPress={()=>this.chooseImage()}>
                                    <View style={{ width: "100%", padding: 10, backgroundColor: "#FF0000" }}>
                                        <Heading fontFamily='lato-bold' fontSize={20} text="Choose Image" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", marginBottom: 10 }}>
                                <TouchableOpacity onPress={()=>this.addFood()}>
                                    <View style={{ width: "100%", padding: 10, backgroundColor: "#FF0000" }}>
                                        <Heading fontFamily='lato-bold' fontSize={20} text="Add Food Item" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Modal>
        );
    }
}
