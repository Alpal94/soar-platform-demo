import BigNumber from 'bignumber.js';
import * as Web3 from 'web3';
import * as Promise from 'bluebird';

const SkymapTokenContract = require('./contracts/SkymapToken.json');
const FaucetContract = require('./contracts/Faucet.json');

const Config = require('./config.json');
const ConfigLocal = require('./config.local.json');

export default class Web3Helper {

  private static unitValue: BigNumber = new BigNumber(10 ** 18);

  public static fromSkymap(value: number): BigNumber {
    return new BigNumber(value).times(this.unitValue);
  }

  public static toSkymap(value: BigNumber): number {
    var returnValue = value.dividedBy(this.unitValue);
    return returnValue.toNumber();
  }

  public static getCurrentAddress(web3: Web3): string {
    if (web3 === null) {
      return '';
    }
    return web3.eth.accounts[0];
  }

  public static getCurrentNetwork(web3: Web3): string {
    if (web3 === null) {
      return '';
    }
    return web3.version.network;
  }

  public static getCurrentNetworkName(web3: Web3): string {
    let networkId = this.getCurrentNetwork(web3);
    switch (networkId) {
      case '1':
        return 'Mainnet';
      case '4':
        return 'Rinkeby';
      case '5777':
        return 'Ganache';
      default:
        return 'Unknown';
    }
  }

  public static getSkymapTokenContractAddress(web3: Web3): string {
    // merge object the right-most (last) object's value wins out:
    let addresses = { ...Config.SkymapToken, ...ConfigLocal.SkymapToken };
    let networkId = this.getCurrentNetwork(web3);
    return addresses[networkId];
  }

  // tslint:disable-next-line
  public static getSkymapTokenContractPromise(web3: Web3): Promise<any> {
    let address = this.getSkymapTokenContractAddress(web3);
    let tokenContract = web3.eth.contract(SkymapTokenContract.abi);
    return Promise.resolve(Promise.promisifyAll(tokenContract.at(address)));
  }

  public static getFaucetContractAddress(web3: Web3): string {
    // merge object the right-most (last) object's value wins out:
    let addresses = { ...Config.Faucet, ...ConfigLocal.Faucet };
    let networkId = this.getCurrentNetwork(web3);
    return addresses[networkId];
  }

  // tslint:disable-next-line
  public static getFaucetContractPromise(web3: Web3): Promise<any> {
    let address = this.getFaucetContractAddress(web3);
    let faucetContract = web3.eth.contract(FaucetContract.abi);
    return Promise.resolve(Promise.promisifyAll(faucetContract.at(address)));
  }

}