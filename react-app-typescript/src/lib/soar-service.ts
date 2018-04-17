import Web3Helper from './web3-helper';
import { SoarInfo, UploadListing } from './model';

export function fetchInfo(web3: any): Promise<SoarInfo> {
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    return Promise.all([soarPromise]).then(results => {
        let soarContract = results[0];
        let filesCount = soarContract.listingsCount();
        return Promise.all([filesCount]);
    }).then(results => {
        let res: SoarInfo = {
            listingsCount: results[0].toNumber()
        };
        return res;
    });
}

export function uploadListing(web3: any, upload: UploadListing) {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    return Promise.resolve(soarPromise).then(soarContract => {
        let uploadPromise = soarContract.uploadListing(
            upload.previewUrl, upload.url, upload.pointWKT,
            upload.geohash, upload.metadata, upload.fileHash,
            { from: userAddress });
        return uploadPromise;
    }).then(res => {
        return res.tx;
    });
}

export function eventsListingsUploaded(web3: any) {
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    Promise.resolve(soarPromise).then(soarContract => {
        let listingUploadedEvent = soarContract.ListingUploaded({}, { fromBlock: 0, toBlock: 'latest' });
        listingUploadedEvent.watch((err, res) => {
            console.log(res);
        });
    });
}