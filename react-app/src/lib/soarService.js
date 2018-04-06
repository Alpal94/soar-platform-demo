import { 
  getSoarAddress, 
  getCurrentNetwork, 
  getCurrentAddress,
  getSkymapTokenAddress
} from './web3Service';
import Soar from './soar';
import SkymapToken from './skymap';


let soarAddress = '0x0';
let skymapTokenAddress = '0x0';

const setContractAddress = (web3) => {
  let networkId = getCurrentNetwork(web3);
  soarAddress = getSoarAddress(networkId);
  skymapTokenAddress = getSkymapTokenAddress(networkId);
}

export const getBuyFileData = (web3, fileHash, price, challenge) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    return soar.buyFileData(fileHash, price, challenge, currentAddress);

  } catch (err) {
    console.log('buyFileSkymap: ', err)
    return null;
  }
}

export const approve = (web3, price) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    let skymapToken = new SkymapToken(web3, skymapTokenAddress, getCurrentNetwork(web3));
    return skymapToken.approve(soarAddress, web3.toWei(price), currentAddress);
    
  } catch (err) {
    console.log('buyFileSkymap: ', err)
    return null;
  }
}

export const approveAndBuy = (web3, price, data) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    let skymapToken = new SkymapToken(web3, skymapTokenAddress, getCurrentNetwork(web3));
    return skymapToken.approveAndBuy(soarAddress, web3.toWei(price), data, currentAddress);
    
    // console.log("BuyFileData: ", data);

    // return result;
  } catch (err) {
    console.log('buyFileSkymap: ', err)
    return null;
  }
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
    const result = soar.uploadFile(previewUrl, url, pointWKT, metadata, fileHash, geohash, currentAddress);
    return result;
  } catch (err) {
    console.log('uploadFile: ', err)
    return null;
  }
}

export const buyFile = (web3, fileHash, challenge) => {
  try {
    setContractAddress(web3);
    let currentAddress = getCurrentAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.buyFile(fileHash, challenge, currentAddress);
    return result;
  } catch (err) {
    console.log('buyFile: ', err)
    return null;
  }
}

export const getPriceForFile = (web3, fileHash) => {
  try {
    setContractAddress(web3);
    const soar = new Soar(web3, soarAddress);
    const result = soar.getPriceForFile(fileHash);
    return result;
  } catch (err) {
    console.log('getPriceForFile: ', err)
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