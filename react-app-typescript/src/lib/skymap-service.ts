import Web3Helper from './web3-helper';

export function approveTokens(web3: any, price: number): Promise<string> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let soarAddress = Web3Helper.getSoarContractAddress(web3);
    let skymapPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    return skymapPromise.then(skymapContract => {
        return skymapContract.approve(soarAddress, Web3Helper.fromSkymap(web3, price), {from: userAddress});
    }).then(result => {
        return result.tx;
    });
}