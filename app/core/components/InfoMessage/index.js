import React from 'react';
import {
  View,
  Text
} from 'react-native';


const InfoMessage = ({text}) => (
<View style={styles.container}>
  <Text style={styles.text} >{text}</Text>
</View>
);

InfoMessage.propTypes = {};

const styles = {
    container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  text: {
    width: '100%',
    textAlign: 'center',
    color: '#c7c7c7',
    fontSize: 14,
    flexWrap: "wrap",

  },
};

export default InfoMessage;