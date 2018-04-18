import { call, put, take } from 'redux-saga/effects';

import { fetchInfo, eventListingUploaded } from '../../lib/soar-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { fetchSoarInfoSuccessAction, eventListingUploadedSuccessAction } from './actions';
import { progressMessageAction, progressMessageDoneAction } from '../ProgressBar/actions';
import { alertSuccessAction, alertErorrAction } from '../Alert/actions';
import { ListingsInfo, EventListingUploaded } from '../../lib/model';

export function* fetchSoarInfoSaga(web3: any) {
    try {
        yield put(progressMessageAction('Updating soar information'));
        const info: ListingsInfo = yield call(fetchInfo, web3);
        yield put(fetchSoarInfoSuccessAction(info));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* eventListingUploadedSaga(web3: any) {
    try {
        let blockFrom: number = 0;
        while (true) {
            let value: EventListingUploaded = yield call(eventListingUploaded, web3, blockFrom);
            blockFrom = value.blockNumber + 1;
            yield put(eventListingUploadedSuccessAction(value));
        }
    } catch (err) {
        yield put(alertErorrAction(err.message));
    }
}

export function* soarInfoWatcher() {
    while (true) {
        const { web3 } = yield take(at.LISTINGS_SOAR_INFO_FETCH);
        yield call(fetchSoarInfoSaga, web3);
    }
}

export function* soarEventListingUploadedWatcher() {
    while (true) {
        const { web3 } = yield take(at.LISTINGS_EVENT_UPLOADED);
        yield call(eventListingUploadedSaga, web3);
    }
}
