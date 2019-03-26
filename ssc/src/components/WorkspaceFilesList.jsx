import React, { Component, Fragment } from 'react';
import { makeAPICalls } from '../utils/apiCalls';
import '../App.css';
import { Card, Button } from 'react-bootstrap';
import './WorkSpaceFiles.css';
import Mic from '../components/Mic';
import axios from 'axios';

class WorkspaceFilesList extends Component {
    state = {
        files: [],
        workspaceFilesUpdated: false,
        loading: false,
        selectedFile: null,
        showDecrypt: false
    };

    componentDidMount() {
        const { workspace } = this.props;
        console.log( this.props );
        this.getWorkspaceFiles( workspace );
    }
    render() {
        const { files, selectedFile, showDecrypt } = this.state;
        // const { workspace } = this.props;
        return (
            <div className="filesStyle">
                {files.map( singlefile => {
                    return (
                        <div key={singlefile.file_name} className="container">
                            {/* <li>
                                <h3>{file.file_name}</h3>
                            </li> */}
                            <Card style={{ width: '10rem' }}>
                                <Card.Body>
                                    <Card.Title>{singlefile.file_name}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title.
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        data-filename={singlefile.file_name}
                                        onClick={e =>
                                            this.setState( {
                                                selectedFile: e.target.dataset.filename,
                                                showDecrypt: !showDecrypt
                                            } )
                                        }
                                    >
                                        Decrypt
                                    </Button>
                                    {showDecrypt && (
                                        <Mic
                                            decrypt={true}
                                            handleRecordedAudio={this.handleClick}
                                        />
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    );
                } )}
            </div>
        );
    }
    getWorkspaceFiles = workspace => {
        const apiObj = {
            url: `/workspaces/${ workspace }/files`,
            reqObjectKey: 'files',
            method: 'get'
        };
        makeAPICalls( apiObj )
            .then( files => {
                this.setState( { files, workspaceFilesUpdated: true }, () => {
                    this.props.refreshDone();
                } );
            } )
            .catch( err => {
                this.setState( { users: [], workspaceFilesUpdated: false } );
            } );
    };

    handleClick = audiofile => {
        const { selectedFile } = this.state;
        const { workspace } = this.props;
        const data = new FormData();
        data.append( 'file', audiofile );

        axios.post( `http://localhost:5000/api/decryptFile/${ workspace }/${ selectedFile }`, data )
        .then(({response}) => console.log(response))
        // data.append( 'filename', selectedFile );
        // data.append

        // console.log( event );

        // const filename = event.target.dataset.filename;
        // console.log( filename );
        // const { workspace } = this.props;
        // this.setState(
        //     {
        //         errors: null,
        //         loading: true,
        //         filename: filename
        //     },
        //     () => {
        //         const apiObj = {
        //             url: `/decryptFile/${ workspace }/${ filename }`,
        //             reqObjectKey: 'filename',
        //             method: 'get'
        //         };
        //         makeAPICalls( apiObj )
        //             .then( response => response.blob() )
        //             .then( blob => {
        //                 // 2. Create blob link to download
        //                 const url = window.URL.createObjectURL(
        //                     new Blob( [ blob ] )
        //                 );
        //                 const link = document.createElement( 'a' );
        //                 link.href = url;
        //                 link.setAttribute(
        //                     'download',
        //                     `sample.${ this.state.file }`
        //                 );
        //                 // 3. Append to html page
        //                 document.body.appendChild( link );
        //                 // 4. Force download
        //                 link.click();
        //                 // 5. Clean up and remove the link
        //                 link.parentNode.removeChild( link );
        //                 this.setState( {
        //                     loading: false
        //                 } );
        //             } )
        //             .catch( error => {
        //                 error.json().then( json => {
        //                     this.setState( {
        //                         errors: json,
        //                         loading: false
        //                     } );
        //                 } );
        //             } );
        //     }
        // );

        // event.preventDefault();
    };
}
export default WorkspaceFilesList;
