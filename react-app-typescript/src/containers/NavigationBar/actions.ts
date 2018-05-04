import { actionTypes as at } from './constants';

export const languageUpdateAction = (languageName: string, languageCode: string) => {
    return {
        type: at.NAVIGATION_BAR_SWITCH_LANGUAGE,
        languageName: languageName,
        languageCode: languageCode
    };
};
