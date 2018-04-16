import { fromJS } from 'immutable';
import Alert from './index';

import { actionTypes as at } from './constants';
import { AlertAction } from './model';

const initialState = fromJS({
    message: undefined,
    type: Alert.Type.Info
});

export default (state = initialState, action: AlertAction) => {
    switch (action.type) {
        case at.ALERT_INFO:
            return state
                .set('message', action.payload)
                .set('type', Alert.Type.Info);
        case at.ALERT_SUCCESS:
            return state
                .set('message', action.payload)
                .set('type', Alert.Type.Success);
        case at.ALERT_WARNING:
            return state
                .set('message', action.payload)
                .set('type', Alert.Type.Warning);
        case at.ALERT_ERROR:
            return state
                .set('message', action.payload)
                .set('type', Alert.Type.Error);
        default:
            return state;
    }
};