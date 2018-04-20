import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';
import { NotificationsAction } from './model';

const initialState = fromJS({
    message: undefined
});

export default (state = initialState, action: NotificationsAction) => {
    switch (action.type) {
        case at.NOTIFICATIONS_PROGRESS_MESSAGE:
            return state
                .set('message', action.payload);
        case at.NOTIFICATIONS_PROGRESS_MESSAGE_DONE:
            return initialState;
        default:
            return state;
    }
};