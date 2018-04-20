import { actionTypes as at } from './constants';
import { UserInfo } from '../../lib/model';

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

export const fetchUserInfoAction = (web3: any) => {
    return {
        type: at.NOTIFICATIONS_USER_INFO,
        web3: web3
    };
};

export const fetchUserInfoSuccessAction = (result: UserInfo) => {
    return {
        type: at.NOTIFICATIONS_USER_INFO_SUCCESS,
        payload: result
    };
};
