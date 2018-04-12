import Web3Helper from './web3-helper';
import * as Web3 from 'web3';
import { Info } from './model';

export function fetchInfo(web3: Web3): Promise<Info> {
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    return Promise.resolve(tokenPromise).then(tokenContract => {
        let symbol = tokenContract.symbolAsync();
        let totalSupply = tokenContract.totalSupplyAsync();
        return Promise.all([symbol, totalSupply]);
    }).then(results => {
        let res: Info = {
            symbol: results[0],
            supply: Web3Helper.toSkymap(results[1])
        };
        return res;
    });
}

export function getSKYMTokens(web3: Web3): Promise<boolean> {
    let address = Web3Helper.getCurrentAddress(web3);
    let promise = Web3Helper.getFaucetContractPromise(web3);
    return Promise.resolve(promise).then(instance => {
        return instance.getSKYMTokensAsync({from: address});
    }).then(result => {
        return true;
    });
}