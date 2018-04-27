import { call, put, take } from 'redux-saga/effects';

import { 
    fetchInfoAdmin, setPrices
} from '../../lib/admin-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { fetchInfoSuccess } from './actions';
import { progressMessageAction, progressMessageDoneAction } from '../Notifications/actions';
import { alertSuccessAction, alertErorrAction  } from '../Alert/actions';

import { FaucetInfo, AdminInfo } from '../../lib/model';
import { PricingFormModel } from './model';

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

export function* setPricingSaga(web3: any, model: PricingFormModel) {
    try {
        console.log(model);
        yield put(progressMessageAction('Please confirm transaction using metamask'));
        const txHash: string = yield call(setPrices, web3, model.geohashes, model.price, model.precision);
        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const confirmed: boolean = yield call(waitTxConfirmed, web3, txHash);
        yield put(progressMessageAction('Updating admin information'));
        const result: AdminInfo = yield call(fetchInfoAdmin, web3);
        yield put(fetchInfoSuccess(result));
        yield put(alertSuccessAction('Pricing was successfully set'));
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

export function* adminSetPricingWatcher() {
    while (true) {
        const { web3, model } = yield take(at.ADMIN_SET_PRICING);
        yield call(setPricingSaga, web3, model);
    }
}