import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';



import { Keyboard } from 'react-native'
class Footer extends Component {
  state = {
    text: '',
  }

  changeText = (text) => {
    this.setState({
      text,
    })
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.text);
    this.changeText('');
    Keyboard.dismiss()
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput

            onChangeText={this.changeText}
            value={this.state.text}
            style={styles.input}
            placeholder="Type in to send the message"
          />
        </View>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={this.sendMessage}
          disabled={!this.state.text}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  };
}
const styles = {
  inputWrapper: {
    width: '80%',
    height: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 15,

  },
  input: {
    paddingLeft: 5,
    width: '100%',
    height: 40,
    color: '#a7aab1',
  },
  btnWrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%'
  },
  btnText: {
    color: 'gray',
  },
  container: {
    height: 90,
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#cacaca',
    width: '100%',
    backgroundColor: '#f8f8f8',
  },
}
Footer.propTypes = {}
export default Footer;
