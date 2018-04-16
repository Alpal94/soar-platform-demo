import React, { Component } from 'react';
import getMd5Hash from '../../helpers/FileHashHelper';
import EXIF from 'exif-js';
import ChooseFile from './ChooseFile';
import FileInfo from './FileInfo';
import ChooseLocation from './ChooseLocation';
import FileExif from './FileExif';
import ExifDetails from './ExifDetails';
import './Upload.css';

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileHash: '',
            exifdata: null,
            metadata: null,
            location: null
        };
        this.reset = this.reset.bind(this);
        this.upload = this.upload.bind(this);
        this.onFileChosen = this.onFileChosen.bind(this);
        this.onFileInfoChange = this.onFileInfoChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    onFileChosen(file){
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
        this.setState({metadata: values});
    }

    onLocationChange(loc){
        this.setState({location: loc})
    }

    upload(){
        if(this.state.file && this.state.metadata && this.state.location){
            let metadata = JSON.stringify(this.state.metadata);
            this.props.handleSoarFileUpload(this.props.web3, this.state.file, metadata, this.state.location)
        }
    }

    reset() {
        this.setState({
            file: null,
            fileHash: '',
            exifdata: null,
            locationWKT: null,
            metadata: null
        });
    }

    render() {
        return (
            <div>
                <h1>Upload File</h1>
                <ChooseFile file={this.state.file} onFileChosen={this.onFileChosen}/>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
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
                {
                    this.state.exifdata ? 
                        Object.keys(this.state.exifdata).map((key, index) => {
                            // console.log(key + ": " + this.state.exifdata[key]);
                            return <FileExif key={index} exifKey={key} exifValue={this.state.exifdata[key]} />
                        })
                    
                    
                    : null 
                }

                {this.state.exifdata ? <ExifDetails exifData={this.state.exifdata} /> : null }



                <div className="col-sm-12">
                    <div className="button-panel">
                        <button className="btn btn-danger" onClick={this.reset}>Reset</button>
                        <button className="btn btn-success" onClick={this.upload} >Upload</button>
                    </div>
                </div>
            </div>
        );
  }
}

export default Upload;