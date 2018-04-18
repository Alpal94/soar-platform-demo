import Web3Helper from "./web3-helper";
import Axios from "axios";
import { DownloadDetails } from "./model";


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

