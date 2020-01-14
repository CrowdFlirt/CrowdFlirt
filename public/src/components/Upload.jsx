import React, { Component } from 'react';
import axios from 'axios';

import './Upload.css';



class Upload extends Component {
    constructor(props){
        super(props);
        this.state = {
            success : false,
            url : "",
            error: false,
            errorMessage : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange(ev) {
        ev.preventDefault();
        this.setState({success: false, url : ""});

    }
    handleUpload(ev) {
        let file = this.uploadInput.files[0];
        console.log('file:', file);
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        // Post to S3 to retrieve signed request
        axios.post("http://localhost:3000/upload",{
            fileName : fileName,
            fileType : fileType
        })
            .then(response => {
                let returnData = response.data.data.returnData;
                let signedRequest = returnData.signedRequest;
                let url = returnData.url;
                this.setState({
                    url: url
                });
                console.log("Received a signed request " + signedRequest);

                let options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                // PUT to S3 to send the actual file
                axios.put(signedRequest, file, options)
                    .then(result => {
                        this.setState({success: true});
                    })
                    .catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    }


    render() {
        const SuccessMessage = () => (
            <div styles={{padding:50}}>
                <h3 styles={{color: 'green'}}>Success</h3>
                <a href={this.state.url}>Access the file here</a>
                <br/>
            </div>
        )
        const ErrorMessage = () => (
            <div styles={{padding:50}}>
                <h3 styles={{color: 'red'}}>Failed to upload</h3>
                <span styles={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
                <span>{this.state.errorMessage}</span>
                <br/>
            </div>
        )
        return (
            <div className="upload">
                <h1>Upload</h1>
                {this.state.success ? <SuccessMessage/> : null}
                {this.state.error ? <ErrorMessage/> : null}
                <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                <br/>
                <button onClick={this.handleUpload}>UPLOAD</button>
            </div>
        );
    }
}

export default Upload;
