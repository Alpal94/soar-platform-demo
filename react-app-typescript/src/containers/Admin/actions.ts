import { actionTypes as at } from './constants';
import { AdminInfo } from '../../lib/model';

export const fetchInfoAction = (web3: any) => {
    return {
        type: at.ADMIN_INFO_FETCH,
        web3: web3
    };
};

export const fetchInfoSuccess = (result: AdminInfo) => {
    return {
        type: at.ADMIN_INFO_FETCH_SUCCESS,
        payload: result
    };
};