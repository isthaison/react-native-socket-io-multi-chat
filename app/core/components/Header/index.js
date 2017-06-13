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
        <View style={styles.container}>
          <TouchableOpacity onPress={this.props.leaveChat} style={styles.button}>
            <Text style={styles.buttonText}>Leave chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.toggleSettings} style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
    );
  }
}


const styles = {
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    zIndex: 200,
    // flex: 1,
    backgroundColor: '#00bd9c',
    position: 'absolute',
    top: 0,
  }
}