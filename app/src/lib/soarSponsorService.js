import { getCurrentAddress } from './web3Service';
import axios, { post } from 'axios';

export const getUploadDetails = (web3, fileHash, extension) => {
    try {
        let address = getCurrentAddress(web3);
        let promise = axios.post(
                'https://f3cmroo3se.execute-api.ap-southeast-1.amazonaws.com/dev/upload/details',
                {address, fileHash, extension}
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

export const uploadFileToSponsor = (file, url, secret) => {
    try {
        console.log(file)
        const config = {
            headers: {
                'content-type': file.type
            }
        }
        return post(url, file, config).then(res => {
            return res;
        });
    } catch (err) {
      console.log('getFilesCount: ', err)
      return null;
    }
}