import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchFilesCount = (state, action) => {
  return {filesCount: action.result.toNumber() };
}

export default function (soar = initialState.soar, action) {
  switch (action.type) {
    case types.SOAR_FILE_COUNTS_SUCCESS:
      return fetchFilesCount(soar, action);
    default:
      return soar;
  }
}


