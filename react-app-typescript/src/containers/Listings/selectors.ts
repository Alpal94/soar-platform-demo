import { createSelector } from 'reselect';

const getListingsDomain = () => (state: any) => state.get('listingsDomain');

const selectInfo = () => createSelector(
    getListingsDomain(),
    listingsState => listingsState.get('info').toJS()
);

const selectListings = () => createSelector(
    getListingsDomain(),
    listingsState => listingsState.get('listings')
);

export {
    selectInfo,
    selectListings
};

export default getListingsDomain;