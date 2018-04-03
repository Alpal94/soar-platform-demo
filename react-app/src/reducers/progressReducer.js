import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function (state = initialState.progress, action) {
  switch (action.type) {
  case types.PROGRESS_TEXT:
    return action.value;
  case types.PROGRESS_COMPLETE:
    return null;
  default:
    return state;
  }
}