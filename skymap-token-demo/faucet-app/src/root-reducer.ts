import { combineReducers } from 'redux-immutable';

import faucetReducer from './containers/Faucet/reducer';
import faucetAdminReducer from './containers/FaucetAdmin/reducer';
import progressBarReducer from './containers/ProgressBar/reducer';
import alertReducer from './containers/Alert/reducer';

export interface State {
  faucetDomain: any;
  faucetAdminDomain: any;
  progressBarDomain: any;
  alertDomain: any;
}

export const state = combineReducers({
  faucetDomain: faucetReducer,
  faucetAdminDomain: faucetAdminReducer,
  progressBarDomain: progressBarReducer,
  alertDomain: alertReducer
});