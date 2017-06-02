import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';



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
  }

  render() {

    return (
    <View style={styles.container}>
      <TextInput
        onChangeText={this.changeText}
        value={this.state.text}
        style={styles.input}
        placeholder="Type in to send the message"
      />
      <TouchableOpacity style={styles.btnWrapper} onPress={this.sendMessage}>
        <Text style={styles.btnText}>Send</Text>
      </TouchableOpacity>
    </View>
    );
  };
}
const styles = {
  input: {
    width: '80%',
    height: 40,
    paddingLeft: 5,
    color: 'black',
  },
  btnWrapper: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'gray',
  },
  container: {
    flex: 1,
    height: 100,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'black',
    width: '100%',
    backgroundColor: 'white',
  },
}
Footer.propTypes = {}
export default Footer;
