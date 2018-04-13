import Web3Helper from './web3-helper';
import { Info, InfoAdmin } from './model';

export function fetchInfoAdmin(web3: any): Promise<InfoAdmin> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let faucetAddress = Web3Helper.getFaucetContractAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let faucetPromise = Web3Helper.getFaucetContractPromise(web3);
    let tokenContract;
    let faucetContract;
    return Promise.all([tokenPromise, faucetPromise]).then(results => {
        tokenContract = results[0];    
        faucetContract = results[1];
        return faucetContract.wallet();
    }).then(result => {
        let wallet = result;
        let symbol = tokenContract.symbol();
        let faucetAllowance = tokenContract.allowance(wallet, faucetAddress);
        let walletBalance = tokenContract.balanceOf(wallet);
        let owner = faucetContract.owner();
        return Promise.all([symbol, faucetAllowance, walletBalance, owner]);
    }).then(results => {
        let infoRes: InfoAdmin = {
            isOwner: results[3].toUpperCase() === userAddress.toUpperCase(),
            symbol: results[0],
            faucetAllowance: Web3Helper.toSkymap(web3, results[1]),
            walletBalance: Web3Helper.toSkymap(web3, results[2])
        };
        return infoRes;
    });
}

export function setAllowance(web3: any, value: number): Promise<boolean> {
    let userAddressPromise = Web3Helper.getCurrentAddress(web3);
    let faucetAddress = Web3Helper.getFaucetContractAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let tokenContract;
    let userAddress;
    return Promise.all([tokenPromise, userAddressPromise]).then(results => {
        tokenContract = results[0];
        userAddress = results[1];
        let approve = tokenContract.approve(faucetAddress, Web3Helper.fromSkymap(web3, value), {from: userAddress});
        return Promise.resolve(approve);
    }).then(results => {
        return true;
    });
}