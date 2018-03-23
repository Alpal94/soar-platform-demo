import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getFilesCount,
  verification, 
  uploadFile,
  buyFile,
  verifyFile,
  fileExists
} from '../lib/soarService';
import { 
  getUploadDetails,
  uploadFileToSponsor,
  getDownloadDetails,
  downloadFile
} from '../lib/soarSponsorService';

import fileDownload from 'react-file-download';



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
    console.log('File: ', data)
    yield put({ type: types.FETCHING}); 
    const exists = yield call(fileExists, web3, data.fileHash);
    
    if(!exists) {
      const details = yield call(getUploadDetails, web3, data.fileHash, data.extension);
      console.log('FileUploadDetails: ', details);
      const verificationRes = yield call(verification, web3, details.challenge);
      console.log('Verification: ', verificationRes);
      //todo wait until the verification event is propagated
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
    const result = yield call(buyFile, web3, fileHash, price);
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.SOAR_FILE_PURCHASE_SUCCESS, result: result });
  } catch (err) {
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};

export function* soarDownloadFileSaga({web3, fileHash, url}) {
  try {
    yield put({ type: types.FETCHING}); 
    const result = yield call(verifyFile, web3, fileHash);
    if(result){
      const details = yield call(getDownloadDetails, web3, url);
      console.log('Download details: ', details);
      const verificationRes = yield call(verification, web3, details.challenge);
      console.log('Verification: ', verificationRes);
      //todo wait until the verification event is propagated
      const file = yield call(downloadFile, web3, url, details.secret, verificationRes);
      fileDownload(file, url.split('/').pop());
      

      yield put({ type: types.SOAR_FILE_DOWNLOAD_SUCCESS, result: result });
    } else {
      yield put({ type: types.MESSAGE_ERROR, value: "You haven't bought this file." });
    }
    yield put({ type: types.FETCH_COMPLETE});
  } catch (err) {
    yield put({ type: types.FETCH_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};