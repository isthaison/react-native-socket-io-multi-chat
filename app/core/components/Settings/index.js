import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class Settings extends Component {


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Type your name" 
          placeholderTextColor="white"
          style={styles.input}/>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
styles = {
  container: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    height: '50%',
    padding: 30,
    backgroundColor: 'black'
  },
  input: {
    height: 50,
    color: 'white',
  },
  btnText: {
    color: 'white',
  }
}