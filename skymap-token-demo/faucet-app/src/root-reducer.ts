import { combineReducers } from 'redux-immutable';

import faucetReducer from './containers/Faucet/reducer';

export interface State {
  // tslint:disable-next-line
  faucetDomain: any;
}

export const state = combineReducers({
  faucetDomain: faucetReducer
});