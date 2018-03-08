import initialState from './initialState';
import * as types from '../constants/actionTypes';

const messageOpen = (state, action) => {
  return {value: action.value, style: '', open: true};
}

const messageError = (state, action) => {
    return {value: action.value, style: 'error', open: true};
}

const messageWarning = (state, action) => {
    return {value: action.value, style: 'warning', open: true};
}

const messageClose = (state, action) => {
  return {value: '', style: '', open: false};
}

export default function (message = initialState.message, action) {
  switch (action.type) {
    case types.MESSAGE_ERROR:
      return messageError(message, action);    
    case types.MESSAGE_WARNING:
      return messageWarning(message, action);
    case types.MESSAGE_INFO:
      return messageOpen(message, action);
    case types.MESSAGE_CLOSE:
      return messageClose(message, action);
    default:
      return message;
  }
}