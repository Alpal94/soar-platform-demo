import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getFilesCount, 
  uploadFile,
  purchaseFile
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

export function* soarUploadFileSaga({web3, file}) {
  try {
    yield put({ type: types.FETCHING}); 
    const result = yield call(uploadFile, web3, file);
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.SOAR_FILE_UPLOAD_SUCCESS, result: result });
  } catch (err) {
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};

export function* soarPurchaseFileSaga({web3, fileHash, price}) {
  try {
    yield put({ type: types.FETCHING}); 
    const result = yield call(purchaseFile, web3, fileHash, price);
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.SOAR_FILE_PURCHASE_SUCCESS, result: result });
  } catch (err) {
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};