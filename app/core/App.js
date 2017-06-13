import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import Home from './containers/Home';
import Messanger from './containers/Messanger';
import Notification from './components/Notification';
import { initSocketConnection } from './actions';
import { bindActionCreators } from 'redux';

class App extends Component {

  state = {
    showNotification: false,
  }

  componentDidMount() {
    this.props.socket.on('init', (data) => {
      this.props.initSocketConnection({
        socketId: data.id, // my socket id
        connected: true,
      })
    });
    
    this.props.socket.on('disconnected', (data) => {
      this.props.initSocketConnection({
        socketId: '', // my socket id
        connected: false,
      })
      
    });
    this.props.socket.on('disconnect', (data) => {
      this.props.initSocketConnection({
        socketId: '', // my socket id
        connected: false,
      })
    });

    this.props.socket.on('newJoiner', (data) => {
      if (data.id !== this.props.connection.socketId) {
        this.toggleNotification(true, `${data.name} just arrived`);
      }
    });

    this.props.socket.on('leftJoiner', (data) => {
      this.toggleNotification(true, 'Someone just left');
    });
  }

  toggleNotification(show, text) {
    this.setState({
      showNotification: true,
      notificationText: text,
    })
  }

  hideAnimation = () => {
    this.setState({
      showNotification: false,
    })
  }

  render() {
    const isName = !!this.props.settings.name;
    const isConnected = this.props.connection.connected;
    const isSet = isName && isConnected;

    return (
      <View style={styles.container}>
        <Notification 
          show={this.state.showNotification}
          onAnimationEnded={this.hideAnimation}
          text={this.state.notificationText}
        />

        {( isSet && <Messanger />)}
        { !isSet && <Home />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    paddingTop: 20,
  },

});

const mapStateToProps = ({ socket, connection, settings }) => ({
  socket,
  connection,
  settings
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initSocketConnection }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);