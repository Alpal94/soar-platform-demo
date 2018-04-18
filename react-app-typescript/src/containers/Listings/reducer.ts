import { fromJS, List } from 'immutable';

import { actionTypes as at } from './constants';
import { ListingsAction } from './model';
import { EventListingUploaded } from '../../lib/model';
import { stat } from 'fs';

const initialState = fromJS({
    listings: List<EventListingUploaded>(),
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
        case at.LISTINGS_EVENT_UPLOADED_SUCCESS:
            let listings = state.get('listings').push(action.payload);
            return state
                .set('listings', listings);
        default:
            return state;
    }
};
