import { actionTypes as at } from './constants';

export const alertInfoAction = (text: string) => {
    return {
        type: at.ALERT_INFO,
        payload: text
    };
};

export const alertSuccessAction = (text: string) => {
    return {
        type: at.ALERT_SUCCESS,
        payload: text
    };
};

export const alertWarningAction = (text: string) => {
    return {
        type: at.ALERT_WARNING,
        payload: text
    };
};

export const alertErorrAction = (text: string) => {
    return {
        type: at.ALERT_ERROR,
        payload: text
    };
};

export const alertClearAction = () => {
    return {
        type: at.ALERT_ERROR
    };
};