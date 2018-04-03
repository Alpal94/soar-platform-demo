import { combineReducers } from 'redux';
import isFetching from './fetchingReducer';
import progress from './progressReducer';
import soar from './soarReducer';
import message from './messageReducer';
import metaMask from './metaMaskReducer';

const appReducer = combineReducers({
  isFetching,
  progress,
  soar,
  message,
  metaMask
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
