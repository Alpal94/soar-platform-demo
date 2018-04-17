import { createSelector } from 'reselect';

const getSoarDomain = () => (state: any) => state.get('listingsDomain');

const selectInfo = () => createSelector(
    getSoarDomain(),
    listingsState => listingsState.get('info').toJS()
);

export {
    selectInfo
};

export default getSoarDomain;