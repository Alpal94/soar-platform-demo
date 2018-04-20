import { call, put, take } from 'redux-saga/effects';
import { actionTypes as at } from './constants';
import { UserInfo } from '../../lib/model';
import { progressMessageAction, progressMessageDoneAction, fetchUserInfoSuccessAction } from './actions';
import { alertSuccessAction, alertErorrAction } from '../Alert/actions';
import { fetchUserInfo } from '../../lib/skymap-service';

export function* fetchUserInfoSaga(web3: any) {
    try {
        const info: UserInfo = yield call(fetchUserInfo, web3);
        yield put(fetchUserInfoSuccessAction(info));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

// saga watchers 
export function* userInfoWatcher() {
    while (true) {
        const { web3 } = yield take(at.NOTIFICATIONS_USER_INFO);
        yield call(fetchUserInfoSaga, web3);
    }
}