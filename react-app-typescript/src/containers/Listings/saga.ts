import { call, put, take } from 'redux-saga/effects';
import { actionTypes as at } from './constants';
import { ListingsInfo, Listing, Sale, DownloadDetails } from '../../lib/model';
import { PriceUpdate } from './model';
import {
    fetchSoarInfoSuccessAction, eventListingUploadedSuccessAction,
    priceUpdateSuccessAction, eventUserPurchaseSuccessAction
} from './actions';
import { progressMessageAction, progressMessageDoneAction } from '../Notifications/actions';
import { alertSuccessAction, alertErorrAction } from '../Alert/actions';
import {
    fetchInfo, eventListingUploaded, getListingPriceByGeohash,
    eventUserPurchases, buyListing, verifySale
} from '../../lib/soar-service';
import {
    approveTokens
} from '../../lib/skymap-service';
import { waitTxConfirmed } from '../../lib/web3-service';
import { getDownloadDetails, downloadFile } from '../../lib/soar-sponsor-service';
import * as fileDownload from 'react-file-download';

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
            let value: Listing = yield call(eventListingUploaded, web3, blockFrom);
            blockFrom = value.blockNumber + 1;
            yield put(eventListingUploadedSuccessAction(value));
        }
    } catch (err) {
        yield put(alertErorrAction(err.message));
    }
}

export function* priceUpdateSaga(web3: any, geohash: string) {
    try {
        const price: number = yield call(getListingPriceByGeohash, web3, geohash);
        let update: PriceUpdate = {
            price: price,
            geohash: geohash
        };
        yield put(priceUpdateSuccessAction(update));
    } catch (err) {
        yield put(alertErorrAction(err.message));
    }
}

export function* eventUserPurchasesSaga(web3: any) {
    try {
        let blockFrom: number = 0;
        while (true) {
            let value: Sale = yield call(eventUserPurchases, web3, blockFrom);
            blockFrom = value.blockNumber + 1;
            yield put(eventUserPurchaseSuccessAction(value));
        }
    } catch (err) {
        yield put(alertErorrAction(err.message));
    }
}

export function* buySaga(web3: any, listing: Listing, price: number) {
    try {
        let filehash = listing.filehash;
        let url = listing.url;

        yield put(progressMessageAction('Preparing purchase'));
        let downloadDetails: DownloadDetails = yield call(getDownloadDetails, web3, listing.url, listing.filehash);

        yield put(progressMessageAction('Please confirm transaction using metamask'));
        let approveTxHash = yield call(approveTokens, web3, price);

        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const approveConfirmed: boolean = yield call(waitTxConfirmed, web3, approveTxHash);

        yield put(progressMessageAction('Please confirm transaction using metamask'));
        const buyTxHash: string = yield call(buyListing, web3, filehash, downloadDetails.challenge);

        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const buyConfirmed: boolean = yield call(waitTxConfirmed, web3, buyTxHash);

        if (buyConfirmed) {
            yield put(progressMessageAction('Downloading file'));
            const file = yield call(downloadFile, web3, url, downloadDetails.secret, buyTxHash);
            fileDownload(file, url.split('/').pop());
        } else {
            throw new Error('Error during buying an listing');
        }

    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

export function* downloadSaga(web3: any, listing: Listing) {
    try {
        let filehash = listing.filehash;
        let url = listing.url;

        yield put(progressMessageAction('Preparing download'));
        let downloadDetails: DownloadDetails = yield call(getDownloadDetails, web3, listing.url, listing.filehash);

        yield put(progressMessageAction('Please confirm transaction using metamask'));
        let verificationTxHash = yield call(verifySale, web3, filehash, downloadDetails.challenge);

        yield put(progressMessageAction('Waiting for transaction to be confirmed by network'));
        const verificationConfirmed: boolean = yield call(waitTxConfirmed, web3, verificationTxHash);

        if (verificationConfirmed) {
            yield put(progressMessageAction('Downloading file'));
            const file = yield call(downloadFile, web3, url, downloadDetails.secret, verificationTxHash);
            fileDownload(file, url.split('/').pop());
        } else {
            throw new Error('Error during sale confirmation an listing');
        }
    } catch (err) {
        yield put(alertErorrAction(err.message));
    } finally {
        yield put(progressMessageDoneAction());
    }
}

// saga watchers 
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

export function* soarPriceUpdateWatcher() {
    while (true) {
        const { web3, geohash } = yield take(at.LISTINGS_PRICE_UPDATE);
        yield call(priceUpdateSaga, web3, geohash);
    }
}

export function* soarEventUserPurchaseWatcher() {
    while (true) {
        const { web3 } = yield take(at.LISTINGS_EVENT_USER_PURCHASE);
        yield call(eventUserPurchasesSaga, web3);
    }
}

export function* soarBuyWatcher() {
    while (true) {
        const { web3, listing, price } = yield take(at.LISTINGS_BUY);
        yield call(buySaga, web3, listing, price);
    }
}

export function* soarDownloadWatcher() {
    while (true) {
        const { web3, listing } = yield take(at.LISTINGS_DOWNLOAD);
        yield call(downloadSaga, web3, listing);
    }
}