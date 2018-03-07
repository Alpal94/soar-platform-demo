import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchName = (state, action) => {
  return {name: action.result };
}

export default function (soar = initialState.soar, action) {
  switch (action.type) {
    case types.SOAR_NAME_SUCCESS:
      return fetchName(soar, action);
    default:
      return soar;
  }
}

