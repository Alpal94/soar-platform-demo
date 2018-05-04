import { fromJS } from 'immutable';
import { actionTypes as at } from './constants';
import { SwitchLanguageAction } from './model';
import { Switch } from 'react-router';

const initalState = fromJS({
    languageName: 'English',
    languageCode: 'en'
});

export default (state = initalState, action: SwitchLanguageAction) => {
    switch (action.type) {
        case at.NAVIGATION_BAR_SWITCH_LANGUAGE:
            return state
                .set('languageName', action.languageName)
                .set('languageCode', action.languageCode);
        default:
            return state;
    }
};