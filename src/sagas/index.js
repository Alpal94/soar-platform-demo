import { fork, all } from 'redux-saga/effects';
import { 
  watchSoarFileCounts
} from './watcher';

export default function* startForman() {
  yield all([
    fork(watchSoarFileCounts)
  ]);
};
