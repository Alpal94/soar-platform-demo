import Web3Helper from './web3-helper';
import { ListingsInfo, UploadListing, EventListingUploaded } from './model';

export function fetchInfo(web3: any): Promise<ListingsInfo> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    return Promise.all([soarPromise]).then(results => {
        let soarContract = results[0];
        let filesCount = soarContract.listingsCount();
        return Promise.all([filesCount]);
    }).then(results => {
        let res: ListingsInfo = {
            listingsCount: results[0].toNumber(),
            userAddress: userAddress
        };
        return res;
    });
}

export function uploadListing(web3: any, upload: UploadListing): Promise<string> {
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

export function eventListingUploaded(web3: any, fromBlock: number): Promise<EventListingUploaded> {
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    return new Promise((resolve, reject) => {
        Promise.resolve(soarPromise).then(soarContract => {
            let listingUploadedEvent = soarContract.ListingUploaded({}, { fromBlock: fromBlock, toBlock: 'latest' });
            //TODO temporary solution
            listingUploadedEvent.watch((err, res) => {
                if (res) {
                    let value: EventListingUploaded = {
                        fileHash: web3.toUtf8(res.args.fileHash),
                        geohash: web3.toUtf8(res.args.geoHash),
                        metadata: res.args.metadata,
                        owner: res.args.owner,
                        pointWKT: res.args.pointWKT,
                        previewUrl: res.args.previewUrl,
                        url: res.args.url,
                        blockNumber: res.blockNumber
                    };
                    resolve(value);
                    listingUploadedEvent.stopWatching();
                }
            });
        });
    });

}