import { fork, all } from 'redux-saga/effects';
import { 
  watchSoarName
} from './watcher';

export default function* startForman() {
  yield all([
    fork(watchSoarName)
  ]);
};
