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