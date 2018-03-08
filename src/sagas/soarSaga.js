import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getFilesCount 
} from '../lib/soarService';

export function* getSoarFileCountsSaga({web3}) {
  try {
    yield put({ type: types.FETCHING}); 
    const fileCountResult = yield call(getFilesCount, web3);
    yield put({ type: types.FETCH_COMPLETE});
    
    yield put({ type: types.SOAR_FILE_COUNTS_SUCCESS, result: fileCountResult });
  } catch (err) {
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};