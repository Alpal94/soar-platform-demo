import { actionTypes as at } from './constants';
import { ListingsInfo, EventListingUploaded } from '../../lib/model';

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