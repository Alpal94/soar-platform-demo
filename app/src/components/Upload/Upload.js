import React, { Component } from 'react';
import getMd5Hash from '../../helpers/FileHashHelper';
import './Upload.css';
import EXIF from 'exif-js';
import ChooseFile from './ChooseFile';
import FileInfo from './FileInfo';
import ChooseLocation from './ChooseLocation';


class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileHash: '',
            exifdata: null
        };
        this.reset = this.reset.bind(this);
        this.onFileChosen = this.onFileChosen.bind(this);
        this.onFileInfoChange = this.onFileInfoChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    onFileChosen(file){
        console.log(file);
        if(file && file !== this.state.file){
            this.setState({file: file});
            var promises = [];
            var exifPromise = new Promise(function(resolve, reject){
                EXIF.getData(file, function() {
                    resolve(EXIF.getAllTags(this));
                });
            });
            promises.push(exifPromise);
            var hashPromise = getMd5Hash(file);
            promises.push(hashPromise);
            Promise.all(promises).then(results => {
                this.setState({
                    fileHash: results[1],
                    exifdata: results[0]
                });
            })
        }
    }

    onFileInfoChange(values){
        console.log("FileInfoChanges: ", values);
    }

    onLocationChange(loc){
        console.log("LocationChange: ", loc);
    }

    reset() {
        console.log('reset')
        this.setState({
            file: null,
            fileHash: '',
            exifdata: null
        });
    }

    render() {
        return (
            <div>
                <h1>Upload File</h1>
                <ChooseFile file={this.state.file} onFileChosen={this.onFileChosen}/>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h2>File info</h2>
                        <FileInfo 
                            file={this.state.file} 
                            exifdata={this.state.exifdata}
                            onFileInfoChange={this.onFileInfoChange}/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <h2>Location</h2>
                        <ChooseLocation
                            exifdata={this.state.exifdata}
                            onLocationChange={this.onLocationChange}
                        />

                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="button-panel">
                        <button className="btn btn-danger" onClick={this.reset}>Reset</button>
                        <button className="btn btn-success">Upload</button>
                    </div>
                </div>
            </div>
        );
  }
}

export default Upload;