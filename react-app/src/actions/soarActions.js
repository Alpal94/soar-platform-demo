import * as types from '../constants/actionTypes';

export const soarFilesCountAction = (web3) => ({
  type: types.SOAR_FILE_COUNTS,
  web3
});

export const soarFilePriceAction = (web3, fileHash) => ({
  type: types.SOAR_FILE_PRICE,
  web3,
  fileHash
});

export const soarUploadFileAction = (web3, file, metadata, latlng) => ({
  type: types.SOAR_FILE_UPLOAD,
  web3: web3,
  file,
  metadata,
  latlng
});

export const soarFilePurchaseAction = (web3, fileHash, price, url) => ({
  type: types.SOAR_FILE_PURCHASE,
  web3,
  fileHash,
  price,
  url
});

export const soarDownloadFileAction = (web3, fileHash, url) => ({
  type: types.SOAR_FILE_DOWNLOAD,
  web3,
  fileHash,
  url
});


export const eventSoarUploadAction = (value) =>  ({
  type: types.SOAR_EVENT_UPLOAD,
  value: value
});

export const eventSoarMyPurchaseAction = (value) =>  ({
  type: types.SOAR_EVENT_MY_SALE,
  value: value
});