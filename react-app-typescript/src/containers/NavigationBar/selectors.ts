import { createSelector } from 'reselect';

const getLanguageDomain = () => (state: any) => state.get('languageDomain');

const selectLanguageName = () => createSelector(
    getLanguageDomain(),
    languageState => languageState.get('languageName')
);

const selectLanguageCode = () => createSelector(
    getLanguageDomain(),
    languageState => languageState.get('languageCode')
);

export { selectLanguageName, selectLanguageCode };
export default getLanguageDomain;