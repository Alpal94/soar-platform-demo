import * as types from '../constants/actionTypes';

export const soarFilesCountAction = (web3) => ({
  type: types.SOAR_FILE_COUNTS,
  web3
});