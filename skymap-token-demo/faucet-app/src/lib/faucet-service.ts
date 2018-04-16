import Web3Helper from './web3-helper';
import { Info } from './model';

export function fetchInfo(web3: any): Promise<Info> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let faucetPromise = Web3Helper.getFaucetContractPromise(web3);
    return Promise.all([tokenPromise, faucetPromise]).then(results => {
        let tokenContract = results[0];
        let faucetContract = results[1];
        let symbol = tokenContract.symbol();
        let balance = tokenContract.balanceOf(userAddress);
        let individualCap = faucetContract.INDIVIDUAL_CAP();
        return Promise.all([symbol, balance, individualCap]);
    }).then(results => {
        let res: Info = {
            symbol: results[0],
            balance: Web3Helper.toSkymap(web3, results[1]),
            individualCap: Web3Helper.toSkymap(web3, results[2])
        };
        return res;
    });
}

export function getSKYMTokens(web3: any): Promise<string> {
    let address = Web3Helper.getCurrentAddress(web3);
    let promise = Web3Helper.getFaucetContractPromise(web3);
    return Promise.resolve(promise).then(instance => {
        return instance.getSKYMTokens({from: address});
    }).then(result => {
        return result.tx;
    });
}