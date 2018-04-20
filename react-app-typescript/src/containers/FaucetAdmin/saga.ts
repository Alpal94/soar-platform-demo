import { call, put, take } from 'redux-saga/effects';

import { fetchInfoAdmin, setAllowance, setTokenAddress } from '../../lib/faucet-admin-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess, fetchInfoError } from './actions';
import { progressMessageAction, progressMessageDoneAction } from '../Notifications/actions';
import { alertSuccessAction, alertErorrAction  } from '../Alert/actions';

import { FaucetInfo } from '../../lib/model';

export function* fetchAdminInfo(web3: any) {
    try {
        const result: FaucetInfo = yield call(fetchInfoAdmin, web3);
        yield put(fetchInfoSuccess(result));
    } catch (err) {
        yield put(fetchInfoError(err));
    }
}

export function* setTokenContract(web3: any, address: string) {
    try {
        yield put(progressMessageAction('Please confirm transaction using metamask'));
        const txHash: string = yield call(setTokenAddress, web3, address);
        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const confirmed: boolean = yield call(waitTxConfirmed, web3, txHash);
        yield put(progressMessageAction('Updating admin information'));
        const result: FaucetInfo = yield call(fetchInfoAdmin, web3);
        yield put(fetchInfoSuccess(result));
        yield put(alertSuccessAction('Skymap token was successfully set'));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* setAllowanceSaga(web3: any, value: number) {
    try {
        yield put(progressMessageAction('Please confirm transaction using metamask'));
        const txHash: string = yield call(setAllowance, web3, value);
        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const confirmed: boolean = yield call(waitTxConfirmed, web3, txHash);
        yield put(progressMessageAction('Updating admin information'));
        const result: FaucetInfo = yield call(fetchInfoAdmin, web3);
        yield put(fetchInfoSuccess(result));
        yield put(alertSuccessAction('Allowance was successfully set'));
    } catch (err) {
        yield put(alertErorrAction(err));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* infoAdminWatcher() {
    while (true) {
        const { web3 } = yield take(at.ADMIN_INFO_FETCH);
        yield call(fetchAdminInfo, web3);
    }
}

export function* setTokenContractWatcher() {
    while (true) {
        const { web3, address } = yield take(at.FAUCET_SET_TOKEN_CONTRACT);
        yield call(setTokenContract, web3, address);
    }
}

export function* setAllowanceWatcher() {
    while (true) {
        const { web3, value } = yield take(at.FAUCET_SET_ALLOWANCE);
        yield call(setAllowanceSaga, web3, value);
    }
}
