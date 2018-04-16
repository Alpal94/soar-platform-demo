import { createSelector } from 'reselect';

const getProgressBarDomain = () => (state: any) => state.get('progressBarDomain');

const selectMessage = () => createSelector(
    getProgressBarDomain(),
    progressBarState => progressBarState.get('message')
);

export {
    selectMessage
};

export default getProgressBarDomain;