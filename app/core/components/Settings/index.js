import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    }
  }

  updateName = () => {
    this.props.updateName({ name: this.state.name });
    Keyboard.dismiss();
  }

  render() {
    const { name, updateName } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type your name"
            placeholderTextColor="white"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.btnWrapper} onPress={this.updateName}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
styles = {
  container: {
    position: 'absolute',
    top: 40,
    left: 0,
    width: '100%',
    height: 80,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#00ab8b',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 30,
    color: 'white',
    fontSize: 13,
  },
  inputWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    marginTop: 5,
    flex: 10,
  },
  btnWrapper: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
  }
}