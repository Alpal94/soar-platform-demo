import { actionTypes as at } from './constants';
import { Info } from './model';

export const fetchInfo = (web3: any) => {
    return {
        type: at.TOKEN_INFO_FETCH,
        web3: web3
    };
};

export const fetchInfoSuccess = (result: Info) => {
    return {
        type: at.TOKEN_INFO_FETCH_SUCCESS,
        payload: result
    };
};

export const fetchInfoError = (error: Error) => {
    return {
        type: at.TOKEN_INFO_FETCH_ERROR,
        payload: error
    };
};