import Web3Helper from './web3-helper';
import Axios from 'axios';
import { DownloadDetails } from './model';

export function getDownloadDetails(web3: any, url: string, fileHash: string): Promise<DownloadDetails> {
    let address = Web3Helper.getCurrentAddress(web3);
    return Axios.post(url, { address, fileHash })
        .then(res => {
            return res.data;
        });
}

export function getUploadDetails(web3: any, fileHash: string, contentType: string): Promise<any> {
    let apiUrl = Web3Helper.getSponsorApiUrl(web3);
    let address = Web3Helper.getCurrentAddress(web3);
    let promise = Axios.post(
        apiUrl,
        { address, fileHash, contentType }
    )
        .then(res => {
            return res.data;
        });
    return promise;
}

export function downloadFile(web3: any, url: string, secret: string, txnHash: string): Promise<any> {
    let params = {
        'soarSecret': secret,
        'txnHash': txnHash
    };
    let promise = Axios.get(url, { params: params})
        .then(res => {
            return base64ToArrayBuffer(res.data);
        });
    return promise;
    
}

function base64ToArrayBuffer(base64: string) {
    var binaryString =  window.atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}