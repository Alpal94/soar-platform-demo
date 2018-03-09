import { fork, all } from 'redux-saga/effects';
import { 
  watchSoarFileCounts, watchSoarFileUpload
} from './watcher';

export default function* startForman() {
  yield all([
    fork(watchSoarFileCounts),
    fork(watchSoarFileUpload)
  ]);
};
