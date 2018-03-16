import * as types from '../constants/actionTypes';

export const soarFilesCountAction = (web3) => ({
  type: types.SOAR_FILE_COUNTS,
  web3
});

export const soarUploadFileAction = (web3, file) => ({
  type: types.SOAR_FILE_UPLOAD,
  web3,
  file
});

export const soarFilePurchaseAction = (web3, fileHash, price) => ({
  type: types.SOAR_FILE_PURCHASE,
  web3,
  fileHash,
  price
});

export const soarFileVerifyAction = (web3, fileHash, price) => ({
  type: types.SOAR_FILE_VERIFY,
  web3,
  fileHash
});


export const eventSoarUploadAction = (value) =>  ({
  type: types.SOAR_EVENT_UPLOAD,
  value: value
});

export const eventSoarMyPurchaseAction = (value) =>  ({
  type: types.SOAR_EVENT_MY_SALE,
  value: value
});