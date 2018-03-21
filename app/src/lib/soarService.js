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

export const uploadVerification = (web3, challenge) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    let currentAddress = getCurrentAddress(web3);
    const result = soar.uploadVerification(challenge, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const uploadFile = (web3, previewUrl, url, pointWKT, metadata, fileHash, price) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.uploadFile(previewUrl, url, pointWKT, metadata, fileHash, price, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const buyFile = (web3, fileHash, price) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.buyFile(fileHash, price, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const verifyFile = (web3, fileHash) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.verifyFile(fileHash, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const fileExists = (web3, fileHash) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.fileExists(fileHash);
    return result;
  } catch (err) {
    console.log('fileExists: ', err)
    return null;
  }
}

export const watchUploadEvents = (web3, emitter) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    soar.watchUploadEvents(emitter);
  } catch (err) {
    console.log('uploadFile: ', err)
  }
}


export const watchMyPurchaseEvents = (web3, emitter) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    soar.watchMyPurchaseEvents(currentAddress, emitter);
  } catch (err) {
    console.log('uploadFile: ', err)
  }
}