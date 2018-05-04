import { fromJS } from 'immutable';
import { actionTypes as at } from './constants';
import { SwitchLanguageAction } from './model';
import { Switch } from 'react-router';

const initalState = fromJS({
    language: 'en'
});

export default (state = initalState, action: SwitchLanguageAction) => {
    switch (action.type) {
        case at.NAVIGATION_BAR_SWITCH_LANGUAGE:
            return state
                .set('language', action.language);
        default:
            return state;
    }
};