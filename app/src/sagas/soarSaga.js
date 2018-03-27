import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getFilesCount,
  verification, 
  uploadFile,
  buyFile,
  verifyFile,
  fileExists,
  watchForVerificationEvent
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
    yield put({ type: types.PROGRESS_TEXT, value: "Loading total files count"}); 
    const fileCountResult = yield call(getFilesCount, web3);
    yield put({ type: types.SOAR_FILE_COUNTS_SUCCESS, result: fileCountResult });
    yield put({ type: types.PROGRESS_COMPLETE});
    
  } catch (err) {
    yield put({ type: types.PROGRESS_COMPLETE});
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
      const verificationRes = yield call(verification, web3, details.challenge, data.fileHash);
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

export function* soarPurchaseFileSaga({web3, fileHash, price, url}) {
  try {
    // get secret and challenge from backend server for backend verification 
    yield put({ type: types.PROGRESS_TEXT, value: "Preparing for purchase"}); 
    const details = yield call(getDownloadDetails, web3, url);

    yield put({ type: types.PROGRESS_TEXT, value: "Buying "}); 
    const result = yield call(buyFile, web3, fileHash, price, details.challenge);
    console.log(result)
    yield put({ type: types.PROGRESS_TEXT, value: "Watching for verification event"}); 
    const verificationPropagated = yield call(watchForVerificationEvent, web3, details.challenge);

    if(verificationPropagated){
      // download file
      yield put({ type: types.PROGRESS_TEXT, value: "Downloading file"}); 
      const file = yield call(downloadFile, web3, url, details.secret, result);
      fileDownload(file, url.split('/').pop());
      yield put({ type: types.SOAR_FILE_DOWNLOAD_SUCCESS, result: result });
    } else {
      yield put({ type: types.MESSAGE_ERROR, value: "Verification propagation error" });
    }

    yield put({ type: types.SOAR_FILE_PURCHASE_SUCCESS, result: result });
    yield put({ type: types.PROGRESS_COMPLETE});
  
  } catch (err) {
    yield put({ type: types.PROGRESS_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};

export function* soarDownloadFileSaga({web3, fileHash, url}) {
  try {
    // verify if user bought the file
    yield put({ type: types.PROGRESS_TEXT, value: "Verifying purchase of file"}); 
    const result = yield call(verifyFile, web3, fileHash);
    
    if(result){
      // get secret and challenge from backend server for backend verification 
      yield put({ type: types.PROGRESS_TEXT, value: "Get secret and challenge to verify with the network"}); 
      const details = yield call(getDownloadDetails, web3, url);
      
      // post challenge into the ethereum network to verify account
      yield put({ type: types.PROGRESS_TEXT, value: "Verifying with the ethereum network for download"}); 
      const verificationRes = yield call(verification, web3, details.challenge, fileHash);
      
      // wait for verification event is fired into ethereum network 
      yield put({ type: types.PROGRESS_TEXT, value: "Watching for verification event"}); 
      const verificationPropagated = yield call(watchForVerificationEvent, web3, details.challenge);
      
      if(verificationPropagated){
        // download file
        yield put({ type: types.PROGRESS_TEXT, value: "Downloading file"}); 
        const file = yield call(downloadFile, web3, url, details.secret, verificationRes);
        fileDownload(file, url.split('/').pop());
        yield put({ type: types.SOAR_FILE_DOWNLOAD_SUCCESS, result: result });
      } else {
        yield put({ type: types.MESSAGE_ERROR, value: "Verification propagation error" });
      }


    } else {
      yield put({ type: types.MESSAGE_ERROR, value: "You haven't bought this file." });
    }
    yield put({ type: types.PROGRESS_COMPLETE});
  } catch (err) {
    yield put({ type: types.PROGRESS_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};