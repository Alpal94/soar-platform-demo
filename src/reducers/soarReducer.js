import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchFilesCount = (state, action) => {
  return { ...state, filesCount: action.result.toNumber() };
}

const eventUpload = (state, action) => {
  console.log('EventUpload before: ', state.uploads)
  var res = { ...state, uploads: {...state.uploads, [action.value.transactionHash] : action.value}  }
  console.log('EventUpload after: ', res.uploads)
  return res;
}

export default function (soar = initialState.soar, action) {
  switch (action.type) {
    case types.SOAR_FILE_COUNTS_SUCCESS:
      return fetchFilesCount(soar, action);
    case types.SOAR_EVENT_UPLOAD:
      return eventUpload(soar, action);    
    default:
      return soar;
  }
}


