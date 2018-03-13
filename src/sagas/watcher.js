import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getSoarFileCountsSaga,
  soarUploadFileSaga,
  soarPurchaseFileSaga
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