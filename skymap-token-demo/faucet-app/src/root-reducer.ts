import { combineReducers } from 'redux-immutable';

import faucetReducer from './containers/Faucet/reducer';
import faucetAdminReducer from './containers/FaucetAdmin/reducer';
import progressBarReducer from './containers/ProgressBar/reducer';

export interface State {
  faucetDomain: any;
  faucetAdminDomain: any;
  progressBarDomain: any;
}

export const state = combineReducers({
  faucetDomain: faucetReducer,
  faucetAdminDomain: faucetAdminReducer,
  progressBarDomain: progressBarReducer
});