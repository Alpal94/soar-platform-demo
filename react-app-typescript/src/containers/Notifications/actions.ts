import { actionTypes as at } from './constants';

export const progressMessageAction = (text: string) => {
    return {
        type: at.NOTIFICATIONS_PROGRESS_MESSAGE,
        payload: text
    };
};

export const progressMessageDoneAction = () => {
    return {
        type: at.NOTIFICATIONS_PROGRESS_MESSAGE
    };
};