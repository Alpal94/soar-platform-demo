import { call, put, take } from 'redux-saga/effects';

import { fetchInfo } from '../../lib/soar-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { fetchSoarInfoSuccess } from './actions';
import { progressMessageAction, progressMessageDoneAction } from '../ProgressBar/actions';
import { alertSuccessAction, alertErorrAction  } from '../Alert/actions';
import { SoarInfo } from '../../lib/model';

export function* fetchSoarInfo(web3: any) {
    try {
        yield put(progressMessageAction('Updating soar information'));
        const info: SoarInfo = yield call(fetchInfo, web3);
        yield put(fetchSoarInfoSuccess(info));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* watchSoarListings(web3: any) {
    try {
        yield put(progressMessageAction('Updating soar information'));
        const info: SoarInfo = yield call(fetchInfo, web3);
        yield put(fetchSoarInfoSuccess(info));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* soarInfoWatcher() {
    while (true) {
        const { web3 } = yield take(at.LISTINGS_SOAR_INFO_FETCH);
        yield call(fetchSoarInfo, web3);
    }
}
