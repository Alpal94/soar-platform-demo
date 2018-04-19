import Web3Helper from './web3-helper';
import { Info, InfoAdmin } from './model';

export function fetchInfoAdmin(web3: any): Promise<InfoAdmin> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let faucetAddress = Web3Helper.getFaucetContractAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let faucetPromise = Web3Helper.getFaucetContractPromise(web3);
    let tokenContract;
    let faucetContract;
    let walletAddress;
    return Promise.all([tokenPromise, faucetPromise]).then(results => {
        tokenContract = results[0];    
        faucetContract = results[1];
        return faucetContract.wallet();
    }).then(result => {
        walletAddress = result;
        let symbol = tokenContract.symbol();
        let faucetAllowance = tokenContract.allowance(walletAddress, faucetAddress);
        let walletBalance = tokenContract.balanceOf(walletAddress);
        let owner = faucetContract.owner();
        let tokenAddress = faucetContract.skymapTokenAddress();
        return Promise.all([symbol, faucetAllowance, walletBalance, owner, tokenAddress]);
    }).then(results => {
        let infoRes: InfoAdmin = {
            isOwner: results[3].toUpperCase() === userAddress.toUpperCase(),
            symbol: results[0],
            faucetAllowance: Web3Helper.toSkymap(web3, results[1]),
            walletBalance: Web3Helper.toSkymap(web3, results[2]),
            tokenAddress: results[4],
            walletAddress: walletAddress
        };
        return infoRes;
    });
}

export function setAllowance(web3: any, value: number): Promise<string> {
    let userAddressPromise = Web3Helper.getCurrentAddress(web3);
    let faucetAddress = Web3Helper.getFaucetContractAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let tokenContract;
    let userAddress;
    return Promise.all([tokenPromise, userAddressPromise]).then(results => {
        tokenContract = results[0];
        userAddress = results[1];
        return tokenContract.approve(faucetAddress, Web3Helper.fromSkymap(web3, value), {from: userAddress});
    }).then(result => {
        return result.tx;
    });
}

export function setTokenAddress(web3: any, address: string): Promise<string> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let faucetPromise = Web3Helper.getFaucetContractPromise(web3);
    return Promise.resolve(faucetPromise).then(faucetContract => {
        return faucetContract.setSkymapTokenContract(address, {from: userAddress});
    }).then(result => {
        return result.tx;
    });
}