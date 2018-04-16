import { actionTypes as at } from './constants';
import { Info } from '../../lib/model';

export const fetchInfoAction = (web3: any) => {
    return {
        type: at.ADMIN_INFO_FETCH,
        web3: web3
    };
};

export const fetchInfoSuccess = (result: Info) => {
    return {
        type: at.ADMIN_INFO_FETCH_SUCCESS,
        payload: result
    };
};

export const fetchInfoError = (error: Error) => {
    return {
        type: at.ADMIN_INFO_FETCH_ERROR,
        payload: error
    };
};

export const setSkymapContractAction = (web3: any, address: string) => {
    return {
        type: at.FAUCET_SET_TOKEN_CONTRACT,
        web3: web3,
        address: address
    };
};

export const setAllowanceAction = (web3: any, value: number) => {
    return {
        type: at.FAUCET_SET_ALLOWANCE,
        web3: web3,
        value: value
    };
};