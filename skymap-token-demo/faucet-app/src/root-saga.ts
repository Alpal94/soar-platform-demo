import { all } from 'redux-saga/effects';

import { tokenInfoWatcher, getSKYMWatcher } from './containers/Faucet/saga';
import { infoAdminWatcher, setTokenContractWatcher } from './containers/FaucetAdmin/saga';

export default function* rootSaga() {
  yield all([
    tokenInfoWatcher(),
    getSKYMWatcher(),
    infoAdminWatcher(),
    setTokenContractWatcher()
  ]);
}
