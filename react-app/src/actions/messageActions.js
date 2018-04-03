import * as types from '../constants/actionTypes';

export const messageInfoAction = (value) =>  ({
  type: types.MESSAGE_INFO,
  value: value
});

export const messageWarningAction = (value) =>  ({
  type: types.MESSAGE_WARNING,
  value: value
});

export const messageCloseAction = () =>  ({
  type: types.MESSAGE_CLOSE
});