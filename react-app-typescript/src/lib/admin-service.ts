import Web3Helper from './web3-helper';
import { AdminInfo } from './model';

export function fetchInfoAdmin(web3: any): Promise<AdminInfo> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let soarPromise = Web3Helper.getSoarContractPromise(web3);
    let tokenContract;
    let soarContract;
    let walletAddress;
    let ownerAddress;
    return Promise.all([tokenPromise, soarPromise]).then(results => {
        tokenContract = results[0];    
        soarContract = results[1];
        console.log(soarContract);
        return soarContract.wallet();
    }).then(result => {
        walletAddress = result;
        let owner = soarContract.owner();
        let skymap = soarContract.skymapTokenAddress();
        let pricing = soarContract.pricingAddress();
        let listingsCount = soarContract.listingsCount();
        let symbol = tokenContract.symbol();
        let walletBalance = tokenContract.balanceOf(walletAddress);
        
        return Promise.all([
            owner, skymap, pricing, listingsCount, symbol, owner, walletBalance
            ]);
    }).then(results => {
        ownerAddress = results[0];
        let isOwner = ownerAddress.toUpperCase() === userAddress.toUpperCase();
        let infoRes: AdminInfo = {
            isOwner: isOwner,
            ownerAddress: ownerAddress,
            skymapTokenAddress: results[1],
            pricingContractAddress: results[2],
            walletAddress: walletAddress,
            listingsCount: results[3].toNumber()
            };
        return infoRes;
    });
}