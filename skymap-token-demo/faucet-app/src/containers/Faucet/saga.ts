import { call, put, take } from 'redux-saga/effects';
import * as Web3 from 'web3';

import { fetchInfo } from '../../lib/skymap-token';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess, fetchInfoError } from './actions';
import { Info } from '../../lib/model';

export function* fetchTokenInfo(web3: Web3) {
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
