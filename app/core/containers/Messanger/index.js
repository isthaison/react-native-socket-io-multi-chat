import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveNameToSettings } from './../../actions';
import List from './../../components/List';
import Footer from './../../components/Footer';
import Header from './../../components/Header';
import Settings from './../../components/Settings';

class Home extends Component {

  constructor(props) {
    super();
    this.socket = props.socket;

    this.socket.on('message', (data) => {
      this.addMessage(data);
    });
    this.socket.on('newSettings', (data) => {
      this.setState({
        messages: [...this.state.messages, { ...data, type: 'settingsChanged' }],
      });
    });


    this.state = {
      messages: [],
      showSettings: false,
    }
  }

  toggleSettings = () => this.setState({
    showSettings: !this.state.showSettings,
  })

  addMessage = (message) => {
    this.setState({
      messages: [...this.state.messages, { ...message, type: 'message' }],
    })
  }

  sendMessage = (data) => {
    this.socket.emit('message', data);
  }

  setSettings = (data) => {
    this.props.socket.emit('setSettings', data)
    this.props.saveNameToSettings(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leaveChat={this.props.socket.disconnect}
          toggleSettings={this.toggleSettings}
        />
        <View style={styles.list}>
          <List messages={this.state.messages} mySocketId={this.props.mySocketId} />
        </View>
        <KeyboardAvoidingView style={styles.footer} behavior="padding">
          <Footer
            sendMessage={this.sendMessage} />
        </KeyboardAvoidingView>
        {this.state.showSettings && <Settings name={this.props.settings.name} updateName={this.setSettings} />}
      </View>
    )
  }
}

Home.propTypes = {};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  footer: {
    bottom: 0,
    position: 'absolute',
  },
  list: {
    paddingBottom: 150,
  },
};

const mapStateToProps = (state) => {
  return ({
    settings: state.settings,
    socket: state.socket,
    mySocketId: state.connection.socketId,
  })
}
const mapDispatchToProps = (dispatch) => bindActionCreators({ saveNameToSettings }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home);