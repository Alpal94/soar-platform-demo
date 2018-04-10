import { combineReducers } from 'redux-immutable';

import usersReducer from './containers/Users/reducer';
import faucetReducer from './containers/Faucet/reducer';

export interface State {
  usersDomain: any;
  faucetDomain: any;
}

export const state = combineReducers({
  usersDomain: usersReducer,
  faucetDomain: faucetReducer
});