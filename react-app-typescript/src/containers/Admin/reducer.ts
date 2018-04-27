import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';
import { AdminAction } from './model';

const initialState = fromJS({
    info: { }
});

export default (state = initialState, action: AdminAction) => {
    switch (action.type) {
        case at.ADMIN_INFO_FETCH:
            return state
                .set('info', initialState.get('info'));
        case at.ADMIN_INFO_FETCH_SUCCESS:
            return state
                .set('info', fromJS(action.payload));
        default:
            return state;
    }
};
