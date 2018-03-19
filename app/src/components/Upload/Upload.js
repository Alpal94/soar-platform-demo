import React, { Component } from 'react';
import getMd5Hash from '../../helpers/FileHashHelper';
import UploadForm from './UploadForm';
import './Upload.css';
import EXIF from 'exif-js';


class Upload extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      
      handleSubmit(val) {
        var promises = [];
        var exifPromise = new Promise(function(resolve, reject){
            EXIF.getData(val.file[0], function() {
                resolve(EXIF.getAllTags(this));
            });
        });
        promises.push(exifPromise);
        var hashPromise = getMd5Hash(val.file[0]);
        promises.push(hashPromise);
        Promise.all(promises).then(results => {
            let hash = results[1];
            let exif = results[0];
            let data = {
                pointWKT: val.pointWKT,
                fileHash: hash,
                price: val.price,
                file: val.file[0],
                extension: val.file[0].name.split('.').pop(),
                exifdata: exif
            };
            this.props.handleSoarFileUpload(this.props.web3, data)
            
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