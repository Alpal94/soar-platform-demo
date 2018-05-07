import { createSelector } from 'reselect';

const getLanguageDomain = () => (state: any) => state.get('languageDomain');

const selectLanguage = () => createSelector(
    getLanguageDomain(),
    languageState => languageState.get('language')
);

export { selectLanguage };
export default getLanguageDomain;