import { combineReducers } from 'redux';
import { socketTypes, settingsTypes } from './../actions/actionTypes';
// const socketReducer = (socket) => (state = {}, action) => {
const socketReducer = (socket) => (state = {}, action) => {
  return socket;
}

const connectionReducer = (state = {connected: false, socketId: ''}, action) => {
  switch (action.type) {
    case socketTypes.INIT_CONNECTION:
      return action.payload;
    default:
      return state
  }
}
const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case settingsTypes.SET_NAME:
      return action.payload;
    default:
      return state
  }
}

const coreReducer = ({ socket }) => combineReducers({
  socket: socketReducer(socket),
  connection: connectionReducer,
  settings: settingsReducer,
})


export default coreReducer