import { getSoarAddress, getCurrentNetwork, getCurrentAddress } from './web3Service';
import Soar from './soar';

let soarAddress = '0x0';

const setContractAddress = (web3) => {
  soarAddress = getSoarAddress(getCurrentNetwork(web3));
}

export const getFilesCount = (web3) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.filesCount();
    return result;
  } catch (err) {
    console.log('getFilesCount: ', err)
    return null;
  }
}

export const uploadFile = (web3, file) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.uploadFile(file, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}