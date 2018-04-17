import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';
import { ListingsAction } from './model';

const initialState = fromJS({
    info: { listingsCount: 0 }
});

export default (state = initialState, action: ListingsAction) => {
    switch (action.type) {
        case at.LISTINGS_SOAR_INFO_FETCH:
            return state
                .set('info', initialState.get('info'));
        case at.LISTINGS_SOAR_INFO_FETCH_SUCCESS:
            return state
                .set('info', fromJS(action.payload));
        default:
            return state;
    }
};
