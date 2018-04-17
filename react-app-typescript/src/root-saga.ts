import { all } from 'redux-saga/effects';

import { tokenInfoWatcher, getSKYMWatcher } from './containers/Faucet/saga';
import { infoAdminWatcher, setTokenContractWatcher, setAllowanceWatcher } from './containers/FaucetAdmin/saga';
import { soarInfoWatcher } from './containers/Listings/saga';
import { uploadListingWatcher } from './containers/Upload/saga';

export default function* rootSaga() {
  yield all([
    tokenInfoWatcher(),
    getSKYMWatcher(),
    infoAdminWatcher(),
    setTokenContractWatcher(),
    setAllowanceWatcher(),
    soarInfoWatcher(),
    uploadListingWatcher()
  ]);
}
