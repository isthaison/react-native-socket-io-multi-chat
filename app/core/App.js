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
import { initSocketConnection } from './actions';
import { bindActionCreators } from 'redux';

class App extends Component {

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


  }


  render() {
    const isName = !!this.props.settings.name;
    const isConnected = this.props.connection.connected;
    const isSet = isName && isConnected;

    return (
      <View style={styles.container}>
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
    backgroundColor: 'white',
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