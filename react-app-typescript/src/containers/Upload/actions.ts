import { actionTypes as at } from './constants';
import { UploadListing } from '../../lib/model';

export const uploadListingAction = (web3: any, model: UploadListing) => {
    return {
        type: at.UPLOAD_LISTING,
        web3: web3,
        model: model
    };
};