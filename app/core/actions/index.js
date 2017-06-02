import * as actionTypes from './actionTypes';
const {
    socketTypes,
} = actionTypes


export function initSocketConnectionAction(data) {
    return {
        type: socketTypes.INIT_CONNECTION,
        payload: data
    };
}
export function initSocketConnection(data) {
    return (dispatch) => {
        return dispatch(initSocketConnectionAction(data))
    }
}

