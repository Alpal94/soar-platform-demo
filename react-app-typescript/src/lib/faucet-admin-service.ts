import Web3Helper from './web3-helper';
import { FaucetInfo, FaucetInfoAdmin } from './model';

export function fetchInfoAdmin(web3: any): Promise<FaucetInfoAdmin> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let faucetAddress = Web3Helper.getFaucetContractAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let faucetPromise = Web3Helper.getFaucetContractPromise(web3);
    let tokenContract;
    let faucetContract;
    let walletAddress;
    let faucetOwnerAddress;
    return Promise.all([tokenPromise, faucetPromise]).then(results => {
        tokenContract = results[0];    
        faucetContract = results[1];
        return faucetContract.wallet();
    }).then(result => {
        walletAddress = result;
        let symbol = tokenContract.symbol();
        let faucetAllowance = tokenContract.allowance(walletAddress, faucetAddress);
        let walletBalance = tokenContract.balanceOf(walletAddress);
        let faucetOwner = faucetContract.owner();
        let tokenAddress = faucetContract.skymapTokenAddress();
        let soarOwner = faucetContract.owner();
        return Promise.all([symbol, faucetAllowance, walletBalance, faucetOwner, tokenAddress, soarOwner]);
    }).then(results => {
        faucetOwnerAddress = results[3];
        let infoRes: FaucetInfoAdmin = {
            isOwner: faucetOwnerAddress.toUpperCase() === userAddress.toUpperCase() === walletAddress,
            symbol: results[0],
            faucetAllowance: Web3Helper.toSkymap(web3, results[1]),
            walletBalance: Web3Helper.toSkymap(web3, results[2]),
            tokenAddress: results[4],
            walletAddress: walletAddress,
            faucetOwnerAddress: faucetOwnerAddress,
            soarOwnerAddress: results[5]
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