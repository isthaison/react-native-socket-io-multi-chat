import React from 'react';
import {
  View, ScrollView
} from 'react-native';
import Message from './../Message';
const _scrollToBottomY = 0;
export default ({ messages, mySocketId }) => (
  <ScrollView style={styles.scroll}
    ref={ref => this.scrollView = ref}
    onContentSizeChange={(contentWidth, contentHeight) => {
      this.scrollView.scrollToEnd({ animated: false });
    }}>

    {messages.map((data, key) => <Message key={key} data={data} mySocketId={mySocketId} />)}
  </ScrollView>
);

const styles = {
  scroll: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#eef2f2',
    // marginBottom: 100,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
  },
}