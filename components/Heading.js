import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Heading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ width: "100%" }}>
        <Text allowFontScaling={false} style={{ fontFamily: this.props.fontFamily, fontSize: this.props.fontSize, color: this.props.color }}>
            {this.props.text}
        </Text>
      </View>
    );
  }
}
