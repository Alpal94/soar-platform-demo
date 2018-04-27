import { all } from 'redux-saga/effects';

import {
  tokenInfoWatcher,
  getSKYMWatcher
} from './containers/Faucet/saga';
import {
  infoAdminWatcher,
  setTokenContractWatcher,
  setAllowanceWatcher,
  setIndividualCapWatcher,
  setWaitingPeriodWatcher
} from './containers/FaucetAdmin/saga';
import {
  soarInfoWatcher,
  soarEventListingUploadedWatcher,
  soarPriceUpdateWatcher,
  soarEventUserPurchaseWatcher,
  soarBuyWatcher,
  soarDownloadWatcher
} from './containers/Listings/saga';
import { uploadListingWatcher } from './containers/Upload/saga';
import { userInfoWatcher } from './containers/Notifications/saga';
import {
  adminInfoWatcher,
  adminSetPricingWatcher
} from './containers/Admin/saga';

export default function* rootSaga() {
  yield all([
    tokenInfoWatcher(),
    getSKYMWatcher(),
    infoAdminWatcher(),
    setTokenContractWatcher(),
    setAllowanceWatcher(),
    soarInfoWatcher(),
    soarEventListingUploadedWatcher(),
    uploadListingWatcher(),
    soarPriceUpdateWatcher(),
    soarEventUserPurchaseWatcher(),
    soarBuyWatcher(),
    soarDownloadWatcher(),
    userInfoWatcher(),
    setIndividualCapWatcher(),
    setWaitingPeriodWatcher(),
    adminInfoWatcher(),
    adminSetPricingWatcher()
  ]);
}
