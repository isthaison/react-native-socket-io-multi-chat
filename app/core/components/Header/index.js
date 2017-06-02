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
          <TouchableOpacity onPress={this.props.toggleSettings}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>

      </View>);
  }
}


const styles = {
  settings: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  container: {
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  }
}