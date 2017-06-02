import React, { Component } from 'react';
import { Platform } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import App from './App';
const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
const socketInit = SocketIOClient(`http://${host}:3000`);
const store = createStore(
  rootReducer({socket: socketInit}),
  applyMiddleware(thunk)
);
class Main extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


export default Main;