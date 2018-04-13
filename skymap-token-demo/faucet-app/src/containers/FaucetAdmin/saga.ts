import { call, put, take } from 'redux-saga/effects';

import { fetchInfoAdmin, setAllowance } from '../../lib/faucet-admin-service';
import { getSKYMTokens } from '../../lib/faucet-service';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess, fetchInfoError } from './actions';
import { Info } from '../../lib/model';

export function* fetchAdminInfo(web3: any) {
    try {
        const result: Info = yield call(fetchInfoAdmin, web3);
        yield put(fetchInfoSuccess(result));
    } catch (err) {
        yield put(fetchInfoError(err));
    }
}

export function* setTokenContract(web3: any, address: string) {
    try {
        const success: boolean = yield call(getSKYMTokens, web3);
        if (success) {
            const result: Info = yield call(fetchInfoAdmin, web3);
            yield put(fetchInfoSuccess(result));
        }
    } catch (err) {
        yield put(fetchInfoError(err));
    }
}

export function* setAllowanceSaga(web3: any, value: number) {
    try {
        const success: boolean = yield call(setAllowance, web3, value);
        if (success) {
            const result: Info = yield call(fetchInfoAdmin, web3);
            yield put(fetchInfoSuccess(result));
        }
    } catch (err) {
        yield put(fetchInfoError(err));
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
