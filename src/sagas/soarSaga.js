import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getName 
} from '../lib/soarService';

export function* getSoarNameResultSaga({web3}) {
  try {
    yield put({ type: types.FETCHING}); 
    const soarNameResult = yield call(getName, web3);
    yield put({ type: types.FETCH_COMPLETE});
    
    yield put({ type: types.SOAR_NAME_SUCCESS, result: soarNameResult });
  } catch (err) {
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};
