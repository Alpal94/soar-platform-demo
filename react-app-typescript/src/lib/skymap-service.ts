import Web3Helper from './web3-helper';
import { UserInfo } from './model';

export function approveTokens(web3: any, price: number): Promise<string> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let soarAddress = Web3Helper.getSoarContractAddress(web3);
    let skymapPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    return skymapPromise.then(skymapContract => {
        return skymapContract.approve(soarAddress, Web3Helper.fromSkymap(web3, price), { from: userAddress });
    }).then(result => {
        return result.tx;
    });
}

export function fetchUserInfo(web3: any): Promise<UserInfo> {
    let userAddress = Web3Helper.getCurrentAddress(web3);
    let skymapPromise = Web3Helper.getSkymapTokenContractPromise(web3);
    return skymapPromise.then(skymapContract => {
        return skymapContract.balanceOf(userAddress);
    }).then(result => {
        let res: UserInfo = {
            wallet: userAddress,
            balance: Web3Helper.toSkymap(web3, result),
            network: Web3Helper.getCurrentNetworkName(web3)
        };
        return res;
    });
}