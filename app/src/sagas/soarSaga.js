import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getFilesCount,
  uploadVerification, 
  uploadFile,
  purchaseFile,
  verifyFile,
  fileExists
} from '../lib/soarService';
import { 
  getUploadDetails,
  uploadFileToSponsor
} from '../lib/soarSponsorService';



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

export function* soarUploadFileSaga({web3, data}) {
  try {
    console.log('Web3: ', web3)
    console.log('File: ', data)
    yield put({ type: types.FETCHING}); 
    const exists = yield call(fileExists, web3, data.fileHash);
    
    if(!exists) {
      const details = yield call(getUploadDetails, web3, data.fileHash, data.extension);
      console.log('FileUploadDetails: ', details);
      const verification = yield call(uploadVerification, web3, details.challenge);
      console.log('UploadVerification: ', verification);
      const uploadResult = yield call(uploadFileToSponsor, data.file, details.uploadUrl, details.secret);
      console.log('UploadResult: ', uploadResult);
      const result = yield call(uploadFile, web3, details.previewUrl, details.downloadUrl, data.pointWKT, "{\"resolution\": 1048}", data.fileHash, data.price);
      yield put({ type: types.SOAR_FILE_UPLOAD_SUCCESS, result: result });
    
    } else {
      yield put({ type: types.MESSAGE_ERROR, value: "File already exists on the platform." });

    }
    
    yield put({ type: types.FETCH_COMPLETE});
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

export function* soarVerifyFileSaga({web3, fileHash}) {
  try {
    yield put({ type: types.FETCHING}); 
    const result = yield call(verifyFile, web3, fileHash);
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.SOAR_FILE_VERIFY_SUCCESS, result: result });
  } catch (err) {
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};