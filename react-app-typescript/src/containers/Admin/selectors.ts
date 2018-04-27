import { createSelector } from 'reselect';

const getAdminDomain = () => (state: any) => state.get('adminDomain');

const selectInfo = () => createSelector(
    getAdminDomain(),
    faucetAdminState => faucetAdminState.get('info').toJS()
);

export {
    selectInfo
};

export default getAdminDomain;