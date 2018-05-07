import { actionTypes as at } from './constants';

export const languageUpdateAction = (language: string) => {
    return {
        type: at.NAVIGATION_BAR_SWITCH_LANGUAGE,
        language: language
    };
};
