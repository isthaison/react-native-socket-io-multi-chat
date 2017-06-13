import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'

export default class Header extends Component {


  render() {

    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.leaveChat} style={styles.button}>
            <Text>Leave chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.toggleSettings} style={styles.button}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>);
  }
}


const styles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  }
}