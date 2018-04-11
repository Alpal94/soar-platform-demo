import * as Promise from 'bluebird';
import Web3Helper from './web3-helper';
import { Info } from './model';
import * as Web3 from 'web3';

const SkymapTokenContract = require('./contracts/SkymapToken.json');

export function fetchInfo(web3: Web3): Promise<Info> {
    let tokenPromise = getTokenContractPromise(web3);
    return tokenPromise.then(instance => {
        // tslint:disable-next-line
        let promises: any[] = [];
        promises.push(instance.symbolAsync());
        promises.push(instance.totalSupplyAsync());
        return Promise.all(promises);
    }).then(results => {
        return {
            symbol: results[0],
            supply: Web3Helper.toSkymap(results[1])
        };
    });
}

// tslint:disable-next-line
function getTokenContractPromise(web3: Web3): Promise<any> {
    let address = Web3Helper.getSkymapTokenContractAddress(web3);
    let tokenContract = web3.eth.contract(SkymapTokenContract.abi);
    return Promise.resolve(Promise.promisifyAll(tokenContract.at(address)));
}
