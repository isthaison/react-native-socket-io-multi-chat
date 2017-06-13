import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native'
class Message extends Component {

  state = {
    focused: false,
  }

  toggleFocus = () => {
    this.setState({
      focused: !this.state.focused,
    });
  }

  reportMessage = () => {

  };

  showMenu = () => {
    Alert.alert(
      'What do you want to do?',
      '',
      [
        { text: 'Report', onPress: this.reportMessage },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  render() {
    let messageStyle = { ...styles.message };
    let containerStyle = { ...styles.container };
    let messageTextStyle = { ...styles.messageContent };

    const date = new Date(this.props.data.date).toLocaleString();
    if (this.props.mySocketId === this.props.data.authorId) {
      messageStyle = { ...messageStyle, ...styles.messageIfAuthor };
      containerStyle = { ...containerStyle, ...styles.containerIfAuthor };
      messageTextStyle = { ...messageTextStyle, ...styles.messageContentIfAuthor };
    }
    return (
      <View style={containerStyle} >
        <TouchableOpacity onLongPress={this.showMenu} onPress={this.toggleFocus} style={styles.wrapper}>
          <View style={messageStyle}>
            <Text style={messageTextStyle}>{this.props.data.content}</Text>
          </View>
          {this.state.focused && <Text style={styles.date}>{date}</Text>}
        </TouchableOpacity>
      </View >
    )
  }
}
const styles = {
  date: {
    color: 'gray',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 20,
  },
  containerIfAuthor: {
    justifyContent: 'flex-end',
    paddingLeft: 0,
    paddingRight: 20,
  },
  wrapper: {
    flexDirection: 'column',
    width: '40%',
    marginBottom: 10,
  },
  messageContent: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#68737e',
  },
  messageContentIfAuthor: {
    color: 'white',
  },
  message: {
    backgroundColor: '#d3d8dc',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 10,
  },

  messageIfAuthor: {
    backgroundColor: '#00bd9c',
  }
}
Message.propTypes = {
  author: PropTypes.bool,
}
export default Message;