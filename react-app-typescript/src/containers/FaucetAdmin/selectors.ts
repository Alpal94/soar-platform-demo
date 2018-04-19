import { createSelector } from 'reselect';

const getFaucetAdminDomain = () => (state: any) => state.get('faucetAdminDomain');

const selectInfo = () => createSelector(
    getFaucetAdminDomain(),
    faucetAdminState => faucetAdminState.get('info').toJS()
);

const selectIsLoading = () => createSelector(
    getFaucetAdminDomain(),
    faucetAdminState => faucetAdminState.get('isLoading')
);

const selectIsFetched = () => createSelector(
    getFaucetAdminDomain(),
    faucetAdminState => faucetAdminState.get('isFetched')
);

export {
    selectInfo,
    selectIsLoading,
    selectIsFetched
};

export default getFaucetAdminDomain;