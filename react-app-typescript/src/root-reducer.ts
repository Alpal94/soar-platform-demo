import { combineReducers } from 'redux-immutable';

import faucetReducer from './containers/Faucet/reducer';
import faucetAdminReducer from './containers/FaucetAdmin/reducer';
import notificationsReducer from './containers/Notifications/reducer';
import alertReducer from './containers/Alert/reducer';
import listingsReducer from './containers/Listings/reducer';
import uploadReducer from './containers/Upload/reducer';

export interface State {
  faucetDomain: any;
  faucetAdminDomain: any;
  notificationsDomain: any;
  alertDomain: any;
  listingsDomain: any;
  uploadDomain: any;
}

export const state = combineReducers({
  faucetDomain: faucetReducer,
  faucetAdminDomain: faucetAdminReducer,
  notificationsDomain: notificationsReducer,
  alertDomain: alertReducer,
  listingsDomain: listingsReducer,
  uploadDomain: uploadReducer
});