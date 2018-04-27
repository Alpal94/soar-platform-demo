import { actionTypes as at } from './constants';
import { FaucetInfo } from '../../lib/model';

export const fetchInfoAction = (web3: any) => {
    return {
        type: at.FAUCET_ADMIN_INFO_FETCH,
        web3: web3
    };
};

export const fetchInfoSuccess = (result: FaucetInfo) => {
    return {
        type: at.FAUCET_ADMIN_INFO_FETCH_SUCCESS,
        payload: result
    };
};

export const fetchInfoError = (error: Error) => {
    return {
        type: at.FAUCET_ADMIN_INFO_FETCH_ERROR,
        payload: error
    };
};

export const setSkymapContractAction = (web3: any, address: string) => {
    return {
        type: at.FAUCET_ADMIN_SET_TOKEN_CONTRACT,
        web3: web3,
        address: address
    };
};

export const setAllowanceAction = (web3: any, value: number) => {
    return {
        type: at.FAUCET_ADMIN_SET_ALLOWANCE,
        web3: web3,
        value: value
    };
};

export const setIndividualCapAction = (web3: any, value: number) => {
    return {
        type: at.FAUCET_ADMIN_SET_INDIVIDUAL_CAP,
        web3: web3,
        value: value
    };
};

export const setWaitingPeriodAction = (web3: any, value: number) => {
    return {
        type: at.FAUCET_ADMIN_SET_WAITING_PERIOD,
        web3: web3,
        value: value
    };
};