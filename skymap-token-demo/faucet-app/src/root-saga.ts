import { all } from 'redux-saga/effects';

import { tokenInfoWatcher } from './containers/Faucet/saga';

export default function* rootSaga() {
  yield all([
    tokenInfoWatcher()
  ]);
}
