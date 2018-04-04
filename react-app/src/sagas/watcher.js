import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getSoarFileCountsSaga,
  getPriceForFileSaga,
  soarUploadFileSaga,
  soarPurchaseFileSaga,
  soarDownloadFileSaga
} from './soarSaga';

export function* watchSoarFileCounts() {
  yield takeLatest(types.SOAR_FILE_COUNTS, getSoarFileCountsSaga);
}

export function* watchSoarFileUpload() {
  yield takeLatest(types.SOAR_FILE_UPLOAD, soarUploadFileSaga);
}

export function* watchSoarFilePurchase() {
  yield takeLatest(types.SOAR_FILE_PURCHASE, soarPurchaseFileSaga);
}

export function* watchSoarFileDownload() {
  yield takeLatest(types.SOAR_FILE_DOWNLOAD, soarDownloadFileSaga);
}

export function* watchSoarFilePrice() {
  yield takeLatest(types.SOAR_FILE_PRICE, getPriceForFileSaga);
}