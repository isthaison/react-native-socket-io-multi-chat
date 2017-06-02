import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
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
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
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