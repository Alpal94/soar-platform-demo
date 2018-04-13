import { call, put, take } from 'redux-saga/effects';

import { fetchInfo, getSKYMTokens } from '../../lib/faucet-service';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess, fetchInfoError } from './actions';
import { Info } from '../../lib/model';

export function* fetchTokenInfo(web3: any) {
    try {
        const result: Info = yield call(fetchInfo, web3);
        yield put(fetchInfoSuccess(result));
    } catch (err) {
        yield put(fetchInfoError(err));
    }
}

export function* tokenInfoWatcher() {
    while (true) {
        const { web3 } = yield take(at.TOKEN_INFO_FETCH);
        yield call(fetchTokenInfo, web3);
    }
}

export function* getSKYM(web3: any) {
    try {
        const result: Info = yield call(getSKYMTokens, web3);
        // yield put(fetchInfoSuccess(result));
    } catch (err) {
        // yield put(fetchInfoError(err));
    }
}

export function* getSKYMWatcher() {
    while (true) {
        const { web3 } = yield take(at.FAUCET_GET_SKYM);
        yield call(getSKYM, web3);
    }
}
