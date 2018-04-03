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

export const verificationUpload = (web3, challenge, fileHash) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    let currentAddress = getCurrentAddress(web3);
    const result = soar.verificationUpload(challenge, fileHash, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const verificationSale = (web3, challenge, fileHash) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    let currentAddress = getCurrentAddress(web3);
    const result = soar.verificationSale(challenge, fileHash, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const uploadFile = (web3, previewUrl, url, pointWKT, metadata, fileHash, geohash) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    //temporary set default price to 0.1eth
    const result = soar.uploadFile(previewUrl, url, pointWKT, metadata, fileHash, geohash, 0.1, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const buyFile = (web3, fileHash, price, challenge) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.buyFile(fileHash, price, challenge, currentAddress);
    return result;
  } catch (err) {
    console.log('buyFile: ', err)
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

export const watchForVerificationSaleEvent = (web3, challenge) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    return new Promise(function (resolve, reject) {
      soar.watchForVerificationSaleEvent(challenge, resolve, reject);
    }).then(res => {
      return res;
    })
  } catch (err) {
    console.log('watchForVerificationEvent: ', err)
    return null;
  }
}


export const watchForVerificationUploadEvent = (web3, challenge) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    return new Promise(function (resolve, reject) {
      soar.watchForVerificationUploadEvent(challenge, resolve, reject);
    }).then(res => {
      return res;
    })
  } catch (err) {
    console.log('watchForVerificationEvent: ', err)
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