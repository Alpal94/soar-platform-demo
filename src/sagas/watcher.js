import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getSoarNameResultSaga
} from './soarSaga';

export function* watchSoarName() {
  yield takeLatest(types.SOAR_NAME, getSoarNameResultSaga);
}