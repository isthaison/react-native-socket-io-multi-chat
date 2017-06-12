import * as actionTypes from './actionTypes';
const {
    socketTypes,
    settingsTypes
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
export function saveNameToSettingsAction(data) {
    return {
        type: settingsTypes.SET_NAME,
        payload: data
    };
}
export function saveNameToSettings(data) {
    return (dispatch) => {
        return dispatch(saveNameToSettingsAction(data))
    }
}

