/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
// import SocketIOClient from 'socket-io'
import SocketIOClient from 'socket.io-client/dist/socket.io';
export default class dailystranger extends Component {
  state = {
    messages: [],
    currentMessage: '',
    status: true,

  }
  constructor(props) {
    super();
    this.socket = SocketIOClient('http://localhost:3000');
    this.socket.on('welcome', (data) => {
      this.addMessage(data.message);
      this.updateStatus(true);
      // Respond with a message including this clients' id sent from the server
      this.socket.emit('i am client', { data: 'foo!', id: data.id });
    });
    this.socket.on('time', (data) => {
      this.addMessage(data.time);
    });

    this.socket.on('message', (data) => {
      this.addMessage(data);
    });
    this.socket.on('connection', () => {
      this.socket.on('disconnect', console.log('disconnected'))
    })
    this.socket.on('disconnect', this.updateStatus(false))
  }

  updateStatus = (status) => () => {
    this.setState({
      status
    })
  }
  addMessage = (message) => {
    this.setState({
      messages: [...this.state.messages, message.content],
    })
  }

  sendMessage = () => {
    this.socket.emit('message', { content: this.state.currentMessage, author: 'Mat' });
    this.updateMessage('');
  }

  updateMessage = (msg) => {
    this.setState({
      currentMessage: msg,
    })
  }

  componentWillReceiveProps() {
    console.log(this.socket)
  }
  render() {
    if (!this.state.status)
      return <ActivityIndicator />

    return (
      <View style={styles.container}>
        {this.state.messages.map((msg, key) => (
          <View key={key}>
            <Text>{msg}</Text>
          </View>
        ))}
        <View style={styles.footer}>
          <TextInput
            style={styles.footerInput}
            onChangeText={this.updateMessage}
            value={this.state.currentMessage}
          />
          <TouchableOpacity onPress={this.sendMessage} style={styles.sendBtnWrapper}>
            <Text style={styles.sendBtnText}>Send Me!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerInput: {
    width: '80%',
    height: 40,
  },
  sendBtnWrapper: {
    backgroundColor: 'black',
  },
  sendBtnText: {
    color: 'white',
  },
  footer: {
    flex: 1,
    height: 50,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

AppRegistry.registerComponent('dailystranger', () => dailystranger);
