import { Promise } from 'bluebird';
const SkymapTokenContract = require('./contracts/SkymapToken.json');


export const fetchInfo = (web3: any) => {
    let address = '0xea09e2dab14d2de7a1983ca4047c3f30e8796d3c';
    let tokenContract = web3.eth.contract(SkymapTokenContract.abi);
    let tokenPromise = Promise.resolve(Promise.promisifyAll(tokenContract.at(address)));
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
