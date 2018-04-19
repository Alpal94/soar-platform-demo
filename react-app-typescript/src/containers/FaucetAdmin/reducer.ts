import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';
import { FaucetAdminAction } from './model';

const initialState = fromJS({
    info: { symbol: '', supply: 0 },
    isLoading: false,
    isFetched: false
});

export default (state = initialState, action: FaucetAdminAction) => {
    switch (action.type) {
        case at.ADMIN_INFO_FETCH:
            return state
                .set('isLoading', true)
                .set('isFetched', false)
                .set('info', initialState.get('info'));
        case at.ADMIN_INFO_FETCH_SUCCESS:
            return state
                .set('isLoading', false)
                .set('isFetched', true)
                .set('info', fromJS(action.payload));
        case at.ADMIN_INFO_FETCH_ERROR:
            return state
                .set('isLoading', false)
                .set('isFetched', false)
                .set('info', initialState.get('info'));
        default:
            return state;
    }
};
