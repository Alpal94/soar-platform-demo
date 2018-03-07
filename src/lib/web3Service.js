import SoarContract from './contracts/Soar.json';

export const getSoarAddress = (networkId) => {
  switch (networkId) {
    //mainnet
    case '1':
      return '0x0';
    case '3':
      return '0x0';
    //rinkeby
    case '4':
      return '0x0';
    case '42':
      return '0x0';
    case '5777':
      return SoarContract.networks[5777].address;
    default:
      return '0x0';
  }
}

export const getCurrentAddress = (web3) => {
  if (web3 === null) return;
  return web3.eth.accounts[0];
}

export const getCurrentNetwork = (web3) => {
  if (web3 === null) return;
  return web3.version.network;
}
