import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { 
  getFilesCount,
  verificationSale, 
  verificationUpload, 
  uploadFile,
  buyFile,
  watchForVerificationSaleEvent,
  watchForVerificationUploadEvent
} from '../lib/soarService';
import { 
  getUploadDetails,
  uploadFileToSponsor,
  getDownloadDetails,
  downloadFile
} from '../lib/soarSponsorService';
import fileDownload from 'react-file-download';
import getMd5Hash from '../helpers/FileHashHelper';



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

export function* soarUploadFileSaga({web3, file, pointWKT, metadata}) {
  try {
    const fileHash = yield call(getMd5Hash, file);
    const contentType = file.type;
    console.log('File: ',pointWKT, ' ', metadata, ' ', file, ' ', fileHash, ' ', contentType);
    yield put({ type: types.PROGRESS_TEXT, value: "Preparing for upload"}); 
    const details = yield call(getUploadDetails, web3, fileHash, contentType);
    console.log('FileUploadDetails: ', details);

    yield put({ type: types.PROGRESS_TEXT, value: "Verification for upload"}); 
    const verificationRes = yield call(verificationUpload, web3, details.challenge, fileHash);
    console.log('Verification: ', verificationRes);
    if(verificationRes){
      yield put({ type: types.PROGRESS_TEXT, value: "Watching for verification event"}); 
      const verificationPropagated = yield call(watchForVerificationUploadEvent, web3, details.challenge);
      console.log('Verification propagated: ', verificationPropagated)
  
      yield put({ type: types.PROGRESS_TEXT, value: "Upload image to soar storage"}); 
      const uploadResult = yield call(uploadFileToSponsor, file, details.uploadUrl, details.secret, verificationRes);
      console.log('UploadResult: ', uploadResult);
  
      yield put({ type: types.PROGRESS_TEXT, value: "Upload image hash and info to soar"}); 
      const result = yield call(uploadFile, web3, details.previewUrl, details.downloadUrl, pointWKT, metadata, fileHash);
      yield put({ type: types.SOAR_FILE_UPLOAD_SUCCESS, result: result });
  
    } else {
      yield put({ type: types.MESSAGE_ERROR, value: "Image already exists on the network." });
    }
  
    yield put({ type: types.PROGRESS_COMPLETE});
  } catch (err) {
    yield put({ type: types.PROGRESS_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};

export function* soarPurchaseFileSaga({web3, fileHash, price, url}) {
  try {
    // get secret and challenge from backend server for backend verification 
    yield put({ type: types.PROGRESS_TEXT, value: "Preparing for purchase"}); 
    const details = yield call(getDownloadDetails, web3, url, fileHash);
    console.log('Challenge details: ', details);
    yield put({ type: types.PROGRESS_TEXT, value: "Buying "}); 
    const result = yield call(buyFile, web3, fileHash, price, details.challenge);
    console.log('TxnHash: ', result);
    
    yield put({ type: types.PROGRESS_TEXT, value: "Watching for verification event"}); 
    const verificationPropagated = yield call(watchForVerificationSaleEvent, web3, details.challenge);
    console.log('Verification propagated: ', verificationPropagated)
    
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
    // get secret and challenge from backend server for backend verification 
    yield put({ type: types.PROGRESS_TEXT, value: "Get secret and challenge to verify with the network"}); 
    const details = yield call(getDownloadDetails, web3, url, fileHash);
    console.log('Details: ', details)
    // post challenge into the ethereum network to verify account
    yield put({ type: types.PROGRESS_TEXT, value: "Verifying with the ethereum network for download"}); 
    const verificationRes = yield call(verificationSale, web3, details.challenge, fileHash);
    
    // wait for verification event is fired into ethereum network 
    yield put({ type: types.PROGRESS_TEXT, value: "Watching for verification event"}); 
    const verificationPropagated = yield call(watchForVerificationSaleEvent, web3, details.challenge);
    
    if(verificationPropagated){
      // download file
      yield put({ type: types.PROGRESS_TEXT, value: "Downloading file"}); 
      const file = yield call(downloadFile, web3, url, details.secret, verificationRes);
      fileDownload(file, url.split('/').pop());
    } else {
      yield put({ type: types.MESSAGE_ERROR, value: "Verification propagation error" });
    }


    yield put({ type: types.PROGRESS_COMPLETE});
  } catch (err) {
    yield put({ type: types.PROGRESS_COMPLETE});
    yield put({ type: types.MESSAGE_ERROR, value: err.toString() });
  }
};