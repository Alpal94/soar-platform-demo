import { combineReducers } from 'redux';
import system from './systemReducer';
import isFetching from './fetchingReducer';
import soar from './soarReducer';
import warning from './warningReducer';
import metaMask from './metaMaskReducer';

const appReducer = combineReducers({
  system,
  isFetching,
  soar,
  warning,
  metaMask
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
