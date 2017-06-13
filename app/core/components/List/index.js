import React, { Component } from 'react';
import {
  View, ScrollView, Text
} from 'react-native';
import Message from './../Message';

export default class List extends Component {

  displayRow = (data, key) => {
    switch (data.type) {
      case 'message':
        return <Message key={key} data={data} mySocketId={this.props.mySocketId} />;
        break;
      case 'settingsChanged':
        return <Text style={styles.info} key={key}>{data.oldName} has changed name to {data.newName}</Text>
        break;
    }
  }

  render() {
    const { messages } = this.props;
    return (
      <ScrollView style={styles.scroll}
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: false });
        }}
      >
        {messages.map(this.displayRow)}
      </ScrollView>
    );
  }
}

const styles = {
  info: {
    textAlign: 'center',
    width: '100%',
    color: '#c7c7c7',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  scroll: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#eef2f2',
  },
}