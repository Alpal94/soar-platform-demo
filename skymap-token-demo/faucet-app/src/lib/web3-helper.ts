
const Config = require('./config.json');
const ConfigLocal = require('./config.local.json');

export default class Web3Helper {

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
    return web3.version.network;
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

  public static getSkymapTokenContractAddress(web3: any): string {
    // merge object the right-most (last) object's value wins out:
    let addresses = { ...Config.SkymapToken, ...ConfigLocal.SkymapToken };
    let networkId = this.getCurrentNetwork(web3);
    return addresses[networkId];
  }
}