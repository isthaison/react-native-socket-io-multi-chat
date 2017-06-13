import React, { Component } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet
} from 'react-native';



class Notification extends Component {
  state = {
    showNotification: false,
    animation: new Animated.Value(0),
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.runAnimation();
    }
  }

  runAnimation = () => {
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
    });
    this.props.onAnimationEnded();
  }

  render() {
    const { text } = this.props;

    if (!this.state.showNotification) {
      return null;
    }
    return (
      <Animated.View
        style={[styles.container, { height: this.state.animation }]}>
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </Animated.View>
    )
  }
}

Notification.propTypes = {

}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    backgroundColor: 'red',
    height: 0,
  },
  text: {
    color: 'white',
  }
});

export default Notification;