import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';
import { ProgressBarAction } from './model';

const initialState = fromJS({
    message: undefined
});

export default (state = initialState, action: ProgressBarAction) => {
    switch (action.type) {
        case at.PROGRESS_MESSAGE:
            return state
                .set('message', action.payload);
        case at.PROGRESS_MESSAGE_DONE:
            return initialState;
        default:
            return state;
    }
};