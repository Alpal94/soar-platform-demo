import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';
import { UploadAction } from './model';

const initialState = fromJS({
});

export default (state = initialState, action: UploadAction) => {
    switch (action.type) {
        default:
            return state;
    }
};
