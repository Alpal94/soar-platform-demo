import BigNumber from 'bignumber.js';
const Web3 = require('web3');

var TruffleContract = require('truffle-contract');

const SkymapTokenContract = require('./contracts/SkymapTokenDemo.json');
const FaucetContract = require('./contracts/FaucetDemo.json');
const SoarContract = require('./contracts/Soar.json');

const Config = require('./config.json');
const ConfigLocal = require('./config.local.json');

export default class Web3Helper {

  public static fromSkymap(web3: any, value: number): any {
    return web3.toWei(value);
  }

  public static toSkymap(web3: any, value: any): number {
    return web3.fromWei(value).toNumber();
  }

  public static getCurrentAddress(web3: any): string {
    if (web3 === null) {
      return '';
    }
    return web3.eth.accounts[0];
  }

  public static getCurrentNetwork(web3: any): string {
    if (web3 === null) {
      return '';
    }
    return '5777';
    // return web3.version.network;
  }

  public static getCurrentNetworkName(web3: any): string {
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

  public static getSkymapTokenContractPromise(web3: any): Promise<any> {
    return this.getFaucetContractPromise(web3).then(faucetContract => {
      return faucetContract.skymapTokenAddress();
    }).then(address => {
      let skymapTokenContract = TruffleContract(SkymapTokenContract);
      skymapTokenContract.setProvider(web3.currentProvider);
      return skymapTokenContract.at(address);
    });
  }

  public static getFaucetContractAddress(web3: any): string {
    // merge object the right-most (last) object's value wins out:
    let addresses = { ...Config.Faucet, ...ConfigLocal.Faucet };
    let networkId = this.getCurrentNetwork(web3);
    return addresses[networkId];
  }

  public static getFaucetContractPromise(web3: any): Promise<any> {
    let address = this.getFaucetContractAddress(web3);
    let faucetContract = TruffleContract(FaucetContract);
    faucetContract.setProvider(web3.currentProvider);
    return faucetContract.at(address);
  }

  public static getSoarContractAddress(web3: any): string {
    // merge object the right-most (last) object's value wins out:
    let addresses = { ...Config.Soar, ...ConfigLocal.Soar };
    let networkId = this.getCurrentNetwork(web3);
    return addresses[networkId];
  }

  public static getSoarContractPromise(web3: any): Promise<any> {
    let address = this.getSoarContractAddress(web3);
    let soarContract = TruffleContract(SoarContract);
    soarContract.setProvider(web3.currentProvider);
    return soarContract.at(address);
  }

  public static waitTxConfirmed(web3: any, txHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let latestFilter = web3.eth.filter('latest');
      let counter = 0;
      latestFilter.watch((error, result) => {
        if (error) {
          resolve(false);
        }
        let receiptPromise = web3.eth.getTransactionReceipt(txHash, (err, res) => {
          if (res !== null) {
            resolve(true);
          } else if (counter > 50) {
            resolve(false);
          } else if (err) {
            resolve(false);
          }
          counter++;
        });
      });
    });
  }

  public static getSponsorApiUrl(web3) : string {
    let networkId = this.getCurrentNetwork(web3);
    switch (networkId) {
      //mainnet
      case '1':
        return '';
      //rinkeby
      case '4':
        return 'https://f3cmroo3se.execute-api.ap-southeast-1.amazonaws.com/rinkeby/upload/details';
      case '5777':
        return 'https://f3cmroo3se.execute-api.ap-southeast-1.amazonaws.com/dev/upload/details';
      default:
        return '';
    }
  }
}