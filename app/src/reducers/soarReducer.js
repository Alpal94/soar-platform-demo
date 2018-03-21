import initialState from './initialState';
import * as types from '../constants/actionTypes';

const fetchFilesCount = (state, action) => {
  return { ...state, filesCount: action.result.toNumber() };
}

const eventUpload = (state, action) => {
  var res = { ...state, uploads: {...state.uploads, [action.value.fileHash] : action.value}  }
  return res;
}

const eventMyPurchase = (state, action) => {
  var res = { ...state, myPurchases: {...state.myPurchases, [action.value.fileHash] : action.value}  }
  return res;
}

export default function (soar = initialState.soar, action) {
  switch (action.type) {
    case types.SOAR_FILE_COUNTS_SUCCESS:
      return fetchFilesCount(soar, action);
    case types.SOAR_EVENT_UPLOAD:
      return eventUpload(soar, action);    
    case types.SOAR_EVENT_MY_SALE:
      return eventMyPurchase(soar, action);    
    default:
      return soar;
  }
}


