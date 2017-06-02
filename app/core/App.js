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
import { initSocketConnection } from './actions';
import { bindActionCreators } from 'redux';
class App extends Component {

  componentDidMount() {
    this.props.socket.on('init', (data) => {
      this.props.initSocketConnection({
        socketId: data.id, // my socket id
      })
      this.props.socket.emit('setSettings', {});
    });
    this.props.socket.on('newJoiner', (data) => {
      if (data.id !== this.props.connection.socketId) {
        this.setState({
          notificationText: 'Someone just arrived',
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
        <Home />
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
const mapStateToProps = ({ socket, connection }) => ({
  socket,
  connection
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initSocketConnection }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);