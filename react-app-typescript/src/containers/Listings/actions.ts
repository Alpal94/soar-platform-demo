import { actionTypes as at } from './constants';
import { SoarInfo } from '../../lib/model';

export const fetchSoarInfo = (web3: any) => {
    return {
        type: at.LISTINGS_SOAR_INFO_FETCH,
        web3: web3
    };
};

export const fetchSoarInfoSuccess = (result: SoarInfo) => {
    return {
        type: at.LISTINGS_SOAR_INFO_FETCH_SUCCESS,
        payload: result
    };
};