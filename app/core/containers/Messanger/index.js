import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import List from './../../components/List';
import Footer from './../../components/Footer';
import Header from './../../components/Header'
import Settings from './../../components/Settings'
class Home extends Component {
  constructor(props) {
    super();
    this.socket = props.socket;
    this.socket.on('welcome', (data) => {
      this.updateStatus(true);
    });

    this.socket.on('message', (data) => {
      this.addMessage(data);
    });

    this.socket.on('disconnect', this.updateStatus(false));

    this.state = {
      status: false,
      messages: [],
      showSettings: false,
    }
  }

  toggleSettings = () => this.setState({
    showSettings: !this.state.showSettings,
  })

  addMessage = (message) => {
    console.log(message);
    this.setState({
      messages: [...this.state.messages, message],
    })
  }

  updateStatus = (status) => () => {
    this.setState({
      status,
    });
  }

  sendMessage = (data) => {
    this.socket.emit('message', data);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Header toggleSettings={this.toggleSettings} />
        <List messages={this.state.messages} mySocketId={this.props.mySocketId} />
        <Footer
          sendMessage={this.sendMessage} />
        {this.state.showSettings && <Settings />}
      </KeyboardAvoidingView>
    )
  }
}

Home.propTypes = {};
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
}
const mapStateToProps = (state) => {
  return ({
    socket: state.socket,
    mySocketId: state.connection.socketId,
  })
}
export default connect(mapStateToProps)(Home);