import { combineReducers } from 'redux-immutable';

import faucetReducer from './containers/Faucet/reducer';
import faucetAdminReducer from './containers/FaucetAdmin/reducer';

export interface State {
  // tslint:disable-next-line
  faucetDomain: any;
  // tslint:disable-next-line
  faucetAdminDomain: any;
}

export const state = combineReducers({
  faucetDomain: faucetReducer,
  faucetAdminDomain: faucetAdminReducer
});