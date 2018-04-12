import { call, put, take } from 'redux-saga/effects';
import * as Web3 from 'web3';

import { fetchInfoAdmin } from '../../lib/faucet-admin-service';
import { getSKYMTokens } from '../../lib/faucet-service';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess, fetchInfoError } from './actions';
import { Info } from '../../lib/model';

export function* fetchAdminInfo(web3: Web3) {
    try {
        const result: Info = yield call(fetchInfoAdmin, web3);
        yield put(fetchInfoSuccess(result));
    } catch (err) {
        yield put(fetchInfoError(err));
    }
}

export function* setTokenContract(web3: Web3, address: string) {
    try {
        const result: Info = yield call(getSKYMTokens, web3);
        // yield put(fetchInfoSuccess(result));
    } catch (err) {
        // yield put(fetchInfoError(err));
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
