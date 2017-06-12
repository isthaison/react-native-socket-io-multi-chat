import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,

} from 'react-native';
import { connect } from 'react-redux';
import { saveNameToSettings } from './../../actions';
import { bindActionCreators } from 'redux';


class Home extends Component {

  state = {
    name: '',
    connected: false,
  }
  constructor(props) {
    super(props);
    console.log(props)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      connected: nextProps.connection.connected,
    })
  }
  changeNameInState = (name) => this.setState({
    name,
  });

  setName = () => {
    this.props.saveNameToSettings({
      name: this.state.name,
    })
  }
  render() {
    return (
      <View style={styles.mainWrap}>
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
        <TouchableOpacity style={styles.btnWrapper} onPress={this.setName}>
          <Text style={styles.btnText}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  mainWrap: {
    height: '100%',
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',

    backgroundColor: '#00bd9c',
    paddingTop: 10,
    paddingBottom: 10,
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