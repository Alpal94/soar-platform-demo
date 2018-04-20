import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';
import { NotificationsAction } from './model';
import { UserInfo } from '../../lib/model';

const initialState = fromJS({
    message: undefined,
    info: { address: undefined, balance: 0 }
});

export default (state = initialState, action: NotificationsAction) => {
    switch (action.type) {
        case at.NOTIFICATIONS_PROGRESS_MESSAGE:
            return state
                .set('message', action.payload);
        case at.NOTIFICATIONS_PROGRESS_MESSAGE_DONE:
            return initialState;
            case at.NOTIFICATIONS_USER_INFO_SUCCESS:
            return state
                .set('info', action.payload);
        default:
            return state;
    }
};