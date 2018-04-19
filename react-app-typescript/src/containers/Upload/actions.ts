import { actionTypes as at } from './constants';
import { UploadListing, LatLng, Metadata } from '../../lib/model';

export const uploadListingAction = (web3: any, file: File, latLng: LatLng, metadata: Metadata) => {
    return {
        type: at.UPLOAD_LISTING,
        web3: web3,
        file: file,
        latLng: latLng,
        metadata: metadata
    };
};