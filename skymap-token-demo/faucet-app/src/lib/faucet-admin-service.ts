import Web3Helper from './web3-helper';
import { Info, InfoAdmin } from './model';
import * as Web3 from 'web3';

export function fetchInfoAdmin(web3: Web3): Promise<InfoAdmin> {
    let faucetAddress = Web3Helper.getFaucetContractAddress(web3);
    let tokenPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    let faucetPromise = Web3Helper.getFaucetContractPromise(web3);
    let tokenContract;
    let faucetContract;
    return Promise.all([tokenPromise, faucetPromise]).then(results => {
        tokenContract = results[0];    
        faucetContract = results[1];
        return faucetContract.walletAsync();
    }).then(result => {
        let wallet = result;
        let symbol = tokenContract.symbolAsync();
        let faucetAllowance = tokenContract.allowanceAsync(wallet, faucetAddress);
        let walletBalance = tokenContract.balanceOfAsync(wallet);
        return Promise.all([symbol, faucetAllowance, walletBalance]);
    }).then(results => {
        let infoRes: InfoAdmin = {
            symbol: results[0],
            faucetAllowance: Web3Helper.toSkymap(results[1]),
            walletBalance: Web3Helper.toSkymap(results[2])
        };
        return infoRes;
    });
}