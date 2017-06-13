import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,

} from 'react-native';
import { connect } from 'react-redux';
import { saveNameToSettings } from './../../actions';
import { bindActionCreators } from 'redux';


class Home extends Component {

  state = {
    name: 'Test User',
    connected: false,
  }
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('a')
    this.setState({
      connected: nextProps.connection.connected,
    })
  }

  changeNameInState = (name) => this.setState({
    name,
  });

  setName = () => {
    this.props.socket.emit('setSettings', { name: this.state.name })
    this.props.saveNameToSettings({
      name: this.state.name,
    })
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.mainWrap} behavior="padding">
        <View style={styles.container}>
          <Text style={styles.title}>Chat with everyone live!</Text>
          <Text style={styles.description}>You can chat with everyone who is online. No notifications, message sent is only visible for people who are currently online. If they leave, message is gone for them. App doesn't store messages anywhere</Text>
          <Text style={styles.label}>Set your name</Text>
          <TextInput style={styles.input}
            onChangeText={this.changeNameInState}
            value={this.state.name}
            placeholder="My name is bro"
          />
        </View>
        {!this.state.connected && <Text>Not connected</Text>}
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={this.setName}
          disabled={!this.state.name}>
          <Text style={styles.btnText}>
            Save
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = {
  mainWrap: {
    height: '100%',
  },
  btnWrapper: {
    width: '100%',
    flex: 1,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bd9c',
  },
  btnText: {
    color: 'white',
  },
  input: {
    height: 50,
  },
  title: {
    width: '100%',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,

  },
  label: {
    marginTop: 30,
  },
  container: {
    padding: 20,
    flex: 12,
  },
  description: {
    fontSize: 12,
    marginTop: 30,
  }
}
const mapStateToProps = ({ socket, connection }) => ({
  socket,
  connection
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveNameToSettings }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);