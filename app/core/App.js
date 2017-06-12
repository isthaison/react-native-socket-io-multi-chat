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
      console.log('asd');
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
      console.log(data);
      if (data.id !== this.props.connection.socketId) {
        this.setState({
          notificationText: `${data.name} just arrived`,
        })
        this.toggle();
      }
    });

    this.props.socket.on('leftJoiner', (data) => {
      this.setState({
        notificationText: 'Someone just left',
      })
      this.toggle();
    });

  }
  state = {
    showNotification: false,
    notificationText: '',
    animation: new Animated.Value(0),
  }

  toggle() {
    this.setState({
      showNotification: true,
    })
    this.state.animation.setValue(0);  //Step 3
    Animated.sequence([
      Animated.timing(this.state.animation,
        {
          toValue: 20,
          duration: 500,
        }
      ),
      Animated.delay(500),
      Animated.timing(this.state.animation,
        {
          toValue: 0,
          duration: 500,
        })

    ]).start(this.notificationEnded);
  }

  notificationEnded = () => {
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
        {this.state.showNotification &&
          <Animated.View
            style={[styles.notification, { height: this.state.animation }]}>
            <View>
              <Text style={styles.notificationText}>{this.state.notificationText}</Text>
            </View>
          </Animated.View>
        }
        {( isSet && <Messanger />)}
        {!isSet && <Home />}
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
  notification: {
    backgroundColor: 'red',
    height: 0,
  },
  notificationText: {
    color: 'white',
  }
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