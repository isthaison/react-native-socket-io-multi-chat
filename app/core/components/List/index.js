import React from 'react';
import {
  View, ScrollView
} from 'react-native';
import Message from './../Message';

export default ({ messages, mySocketId }) => (
  <ScrollView style={styles.container}>
    {messages.map((data, key) => <Message key={key} data={data} mySocketId={mySocketId} />)}
  </ScrollView>
);

const styles = {
  container: {
    flexDirection: 'column',
    width: '100%',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',

  }
}