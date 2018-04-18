import Web3Helper from './web3-helper';
import { ListingsInfo, UploadListing, Listing, Sale } from './model';

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

export function eventListingUploaded(web3: any, fromBlock: number): Promise<Listing> {
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    return new Promise((resolve, reject) => {
        Promise.resolve(soarPromise).then(soarContract => {
            let listingUploadedEvent = soarContract.ListingUploaded({}, { fromBlock: fromBlock, toBlock: 'latest' });
            //TODO temporary solution
            listingUploadedEvent.watch((err, res) => {
                if (res) {
                    let value: Listing = {
                        filehash: web3.toUtf8(res.args.fileHash),
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

export function getListingPriceByGeohash(web3: any, geoHash: string): Promise<number> {
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    return soarPromise.then(soarContract => {
        let pricePromise = soarContract.getPrice(geoHash);
        return pricePromise;
    }).then(res => {
        return Web3Helper.toSkymap(web3, res);
    });
}

export function eventUserPurchases(web3: any, fromBlock: number): Promise<Sale> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    return new Promise((resolve, reject) => {
        Promise.resolve(soarPromise).then(soarContract => {
            let saleEvent = soarContract.Sale({}, { fromBlock: fromBlock, toBlock: 'latest' });
            //TODO temporary solution
            saleEvent.watch((err, res) => {
                if (res) {
                    let value: Sale = {
                        filehash: web3.toUtf8(res.args.fileHash),
                        owner: res.args.owner,
                        buyer: res.args.buyer,
                        price: Web3Helper.toSkymap(web3, res.args.price),
                        blockNumber: res.blockNumber
                    };
                    resolve(value);
                    saleEvent.stopWatching();
                }
            });
        });
    });
}

export function buyListing(web3: any, filehash: string, challenge: string): Promise<string> {
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    let userAddress = Web3Helper.getCurrentAddress(web3);
    return soarPromise.then(soarContract => {
        return soarContract.buyListing(filehash, challenge, { from: userAddress });
    }).then(result => {
        return result.tx;
    })
}