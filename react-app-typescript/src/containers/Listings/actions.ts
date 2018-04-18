import { actionTypes as at } from './constants';
import { ListingsInfo, EventListingUploaded, EventSale } from '../../lib/model';
import { PriceUpdate } from './model';

export const fetchSoarInfoAction = (web3: any) => {
    return {
        type: at.LISTINGS_SOAR_INFO_FETCH,
        web3: web3
    };
};

export const fetchSoarInfoSuccessAction = (result: ListingsInfo) => {
    return {
        type: at.LISTINGS_SOAR_INFO_FETCH_SUCCESS,
        payload: result
    };
};

export const eventListingUploadedAction = (web3: any) => {
    return {
        type: at.LISTINGS_EVENT_UPLOADED,
        web3: web3
    };
};

export const eventListingUploadedSuccessAction = (value: EventListingUploaded) => {
    return {
        type: at.LISTINGS_EVENT_UPLOADED_SUCCESS,
        payload: value
    };
};

export const priceUpdateAction = (web3: any, geohash: string) => {
    return {
        type: at.LISTINGS_PRICE_UPDATE,
        web3: web3,
        geohash: geohash
    };
};

export const priceUpdateSuccessAction = (value: PriceUpdate) => {
    return {
        type: at.LISTINGS_PRICE_UPDATE_SUCCESS,
        payload: value
    };
};

export const eventUserPurchaseAction = (web3: any) => {
    return {
        type: at.LISTINGS_EVENT_USER_PURCHASE,
        web3: web3
    };
};

export const eventUserPurchaseSuccessAction = (value: EventSale) => {
    return {
        type: at.LISTINGS_EVENT_USER_PURCHASE_SUCCESS,
        payload: value
    };
};