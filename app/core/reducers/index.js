import { combineReducers } from 'redux';
import { socketTypes } from './../actions/actionTypes';
const socketReducer = (socket) => (state = {}, action) => {
  return socket;
}

const connectionReducer = (state = {}, action) => {
  switch (action.type) {
    case socketTypes.INIT_CONNECTION:
      return action.payload;
    default:
      return state
  }
}
const coreReducer = ({ socket }) => combineReducers({
  socket: socketReducer(socket),
  connection: connectionReducer,

})


export default coreReducer