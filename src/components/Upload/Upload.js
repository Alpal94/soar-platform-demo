import React, { Component } from 'react';
import getMd5Hash from '../../helpers/FileHashHelper'
import UploadForm from './UploadForm'
import './Upload.css'


class Upload extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      
      handleSubmit(val) {
        console.log(val)
        var promise = getMd5Hash(val.file[0]);
        promise.then(hash => {
            let file = {
                previewUrl: val.previewUrl,
                url: val.url,
                pointWKT: val.pointWKT,
                metadata: val.metadata,
                fileHash: hash,
                price: val.price
            }
            this.props.handleSoarFileUpload(this.props.web3, file)
        })
      }

    render() {
        return (
        <div className="upload">
            <h1>File Upload</h1>
            <UploadForm handleSubmit={this.handleSubmit}/>
        </div>
        );
    }
}

export default Upload;