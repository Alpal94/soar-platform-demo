import { createSelector } from 'reselect';

// tslint:disable-next-line
const getFaucetDomain = () => (state: any) => state.get('faucetDomain');

const selectInfo = () => createSelector(
    getFaucetDomain(),
    usersState => usersState.get('info').toJS()
);

const selectIsLoading = () => createSelector(
    getFaucetDomain(),
    usersState => usersState.get('isLoading')
);

const selectIsFetched = () => createSelector(
    getFaucetDomain(),
    usersState => usersState.get('isFetched')
);

export {
    selectInfo,
    selectIsLoading,
    selectIsFetched
};

export default getFaucetDomain;