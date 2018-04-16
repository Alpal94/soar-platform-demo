import { createSelector } from 'reselect';

const getAlertDomain = () => (state: any) => state.get('alertDomain');

const selectMessage = () => createSelector(
    getAlertDomain(),
    progressBarState => progressBarState.get('message')
);

const selectType = () => createSelector(
    getAlertDomain(),
    progressBarState => progressBarState.get('type')
);

export {
    selectMessage,
    selectType
};

export default getAlertDomain;