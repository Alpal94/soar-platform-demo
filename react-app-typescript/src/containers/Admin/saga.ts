import { call, put, take } from 'redux-saga/effects';

import { 
    fetchInfoAdmin 
} from '../../lib/admin-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess } from './actions';
import { progressMessageAction, progressMessageDoneAction } from '../Notifications/actions';
import { alertSuccessAction, alertErorrAction  } from '../Alert/actions';

import { FaucetInfo, AdminInfo } from '../../lib/model';

export function* fetchAdminInfo(web3: any) {
    try {
        yield put(progressMessageAction('Fetching info'));
        const result: AdminInfo = yield call(fetchInfoAdmin, web3);
        yield put(fetchInfoSuccess(result));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* adminInfoWatcher() {
    while (true) {
        const { web3 } = yield take(at.ADMIN_INFO_FETCH);
        yield call(fetchAdminInfo, web3);
    }
}