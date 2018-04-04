import { getCurrentAddress, getCurrentNetwork } from './web3Service';
import axios, { post } from 'axios';



export const getUploadDetails = (web3, fileHash, contentType) => {
    try {
        let apiUrl = _getApiUrl(web3);
        let address = getCurrentAddress(web3);
        let promise = axios.post(
                apiUrl,
                {address, fileHash, contentType}
            )
            .then(res => {
                return res.data;
            });
        return promise;
    } catch (err) {
      console.log('getUploadDetails: ', err)
      return null;
    }
}

export const uploadFileToSponsor = (file, url, secret, txnHash) => {
    try {
        console.log(file)
        let params = {
            "soarSecret": secret,
            "txnHash": txnHash
        };
        const config = {
            headers: {
                'content-type': file.type
            },
            params: params
        }
        return post(url, file, config).then(res => {
            return res;
        });
    } catch (err) {
      console.log('getFilesCount: ', err)
      return null;
    }
}

export const getDownloadDetails = (web3, url, fileHash) => {
    console.log(url)
    try {
        let address = getCurrentAddress(web3);
        let promise = axios.post(url, {address, fileHash})
            .then(res => {
                return res.data;
            });
        return promise;
    } catch (err) {
      console.log('getDownloadDetails: ', err)
      return null;
    }
}

export const downloadFile = (web3, url, secret, txnHash) => {
    try {
        //let address = getCurrentAddress(web3);
        let params = {
            "soarSecret": secret,
            "txnHash": txnHash
        };
        let promise = axios.get(url, { params: params})
            .then(res => {
                return _base64ToArrayBuffer(res.data);
            });
        return promise;
    } catch (err) {
      console.log('downloadFile: ', err)
      return null;
    }
}

function _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function _getApiUrl(web3) {
    let networkId = getCurrentNetwork(web3);
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