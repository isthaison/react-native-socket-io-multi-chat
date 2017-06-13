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
  container: {
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  }
}