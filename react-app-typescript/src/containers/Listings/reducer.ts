import { fromJS, List, Map } from 'immutable';

import { actionTypes as at } from './constants';
import { ListingsAction, PriceUpdate } from './model';
import { Listing, Sale } from '../../lib/model';
import { stat } from 'fs';

const initialState = fromJS({
    listings: List<Listing>(),
    prices: Map<string, number>(),
    purchases: Map<string, Sale>(),
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
        case at.LISTINGS_PRICE_UPDATE_SUCCESS:
            let update: PriceUpdate = action.payload;
            let prices = state.get('prices').set(update.geohash, update.price);
            return state
                .set('prices', prices);
        case at.LISTINGS_EVENT_USER_PURCHASE_SUCCESS:
            let sale: Sale = action.payload;
            let purchases = state.get('purchases').set(sale.filehash, sale);
            return state
                .set('purchases', purchases);
        default:
            return state;
    }
};
