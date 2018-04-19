import { call, put, take } from 'redux-saga/effects';

import { verifyUpload, uploadListing } from '../../lib/soar-service';
import { getUploadDetails, uploadFileToStorage } from '../../lib/soar-sponsor-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { actionTypes as at } from './constants';
import { progressMessageAction, progressMessageDoneAction } from '../ProgressBar/actions';
import { alertSuccessAction, alertErorrAction } from '../Alert/actions';
import { FaucetInfo, UploadListing, LatLng, Metadata, UploadDetails } from '../../lib/model';
import UploadHelper from '../../lib/upload-helper';

export function* uploadListingSaga(web3: any, file: File, latlng: LatLng, metadata: Metadata) {
    try {
        let contentType = file.type;
        let pointWKT = 'POINT(' + latlng.lng + ' ' + latlng.lat + ')';
        let geohash = UploadHelper.computeGeohash(latlng);

        yield put(progressMessageAction('Computing file hash'));
        let filehash = yield call(UploadHelper.getMd5Hash, file);

        yield put(progressMessageAction('Preparing upload details'));
        let details: UploadDetails = yield call(getUploadDetails, web3, filehash, contentType);

        yield put(progressMessageAction('Please confirm transaction using metamask'));
        const verTxHash: string = yield call(verifyUpload, web3, filehash, details.challenge);

        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const verificationConfirmed: boolean = yield call(waitTxConfirmed, web3, verTxHash);

        yield put(progressMessageAction('Uploading file to storage'));
        const uploadResult = yield call(uploadFileToStorage, file, details.uploadUrl, details.secret, verTxHash);

        let model: UploadListing = {
            previewUrl: details.previewUrl,
            url: details.downloadUrl,
            fileHash: filehash,
            geohash: geohash,
            pointWKT: pointWKT,
            metadata: JSON.stringify(metadata)
        };
        yield put(progressMessageAction('Please confirm transaction using metamask'));
        const uploadListingTxHash: string = yield call(uploadListing, web3, model);

        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const uploadListingConfirmed: boolean = yield call(waitTxConfirmed, web3, uploadListingTxHash);
        yield put(alertSuccessAction('Upload success'));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* uploadListingWatcher() {
    while (true) {
        const { web3, file, latLng, metadata } = yield take(at.UPLOAD_LISTING);
        yield call(uploadListingSaga, web3, file, latLng, metadata);
    }
}