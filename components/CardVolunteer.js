import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Heading from './Heading';

export default class CardVolunteer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={{ width: this.props.itemWidth, marginBottom: 15, paddingLeft: 5, paddingRight: 5 }} onPress={()=>this.props.navigation.navigate("VolunteerDetail", this.props.object)}>
        <View style={{ position: 'relative', shadowColor: "#000", shadowOffset: { width: 0, height: 7, }, shadowOpacity: 0.41, shadowRadius: 9.11, elevation: 10, backgroundColor: "#FFFFFF", borderRadius: 5 }}>
          <View style={{ width: "100%", height: 110, overflow: 'hidden', borderRadius: 5 }}>
            <Image
              style={{ width: "100%", height: "100%", position: "absolute", }}
              source={{ uri: this.props.object.image }}
            />
          </View>
          <View style={{ width: "100%", padding: 10 }}>
            <View style={{ width: "100%",  }}>
              <Heading fontSize={14} fontFamily="lato-bold" color="#FF0000" text={this.props.object.name} />
            </View>
            <View style={{ width: "100%",  }}>
              <Heading fontSize={12} fontFamily="lato-bold" color="#CCC" text={"Status"} />
            </View>
            <View style={{ width: "100%",  }}>
              <Heading fontSize={12} fontFamily="lato-bold" color="#000" text={this.props.object.status} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
