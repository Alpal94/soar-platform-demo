import { Promise } from 'bluebird';
import Web3Helper from './web3-helper';

const SkymapTokenContract = require('./contracts/SkymapToken.json');

export const fetchInfo = (web3: any) => {
    let tokenPromise = getTokenContractPromise(web3);
    return tokenPromise.then(instance => {
        let promises: any[] = [];
        promises.push(instance.symbolAsync());
        promises.push(instance.totalSupplyAsync());
        return Promise.all(promises);
    }).then(results => {
        return {
            symbol: results[0],
            supply: web3.fromWei(results[1]).toNumber()
        };
    });
}

function getTokenContractPromise(web3: any): any {
    let address = Web3Helper.getSkymapTokenContractAddress(web3);
    let tokenContract = web3.eth.contract(SkymapTokenContract.abi);
    return Promise.resolve(Promise.promisifyAll(tokenContract.at(address)));
}
