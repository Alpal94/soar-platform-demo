import { call, put, take } from 'redux-saga/effects';

import { fetchInfo, getSKYMTokens } from '../../lib/faucet-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess, fetchInfoError } from './actions';
import { progressMessageAction, progressMessageDoneAction } from '../ProgressBar/actions';
import { alertSuccessAction, alertErorrAction  } from '../Alert/actions';
import { Info } from '../../lib/model';

export function* fetchTokenInfo(web3: any) {
    try {
        yield put(progressMessageAction('Updating user information'));
        const info: Info = yield call(fetchInfo, web3);
        yield put(fetchInfoSuccess(info));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
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
        yield put(progressMessageAction('Please confirm transaction using metamask'));
        const txHash: string = yield call(getSKYMTokens, web3);
        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const confirmed: boolean = yield call(waitTxConfirmed, web3, txHash);
        yield put(progressMessageAction('Updating user information'));
        const info: Info = yield call(fetchInfo, web3);
        yield put(fetchInfoSuccess(info));
        yield put(alertSuccessAction('Skymap tokens was added to your account'));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* getSKYMWatcher() {
    while (true) {
        const { web3 } = yield take(at.FAUCET_GET_SKYM);
        yield call(getSKYM, web3);
    }
}
