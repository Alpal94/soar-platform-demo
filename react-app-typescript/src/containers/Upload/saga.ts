import { call, put, take } from 'redux-saga/effects';

import { uploadListing } from '../../lib/soar-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { progressMessageAction, progressMessageDoneAction } from '../ProgressBar/actions';
import { alertSuccessAction, alertErorrAction  } from '../Alert/actions';
import { FaucetInfo, UploadListing } from '../../lib/model';

export function* uploadListingSaga(web3: any, model: UploadListing) {
    try {
        yield put(progressMessageAction('Updating user information'));
        const info: FaucetInfo = yield call(uploadListing, web3, model);
        yield put(alertSuccessAction('Upload success'));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* uploadListingWatcher() {
    while (true) {
        const { web3, model } = yield take(at.UPLOAD_LISTING);
        yield call(uploadListingSaga, web3, model);
    }
}