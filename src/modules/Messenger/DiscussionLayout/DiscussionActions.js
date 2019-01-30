import React, { Component } from 'react';



import { withStyles } from '@material-ui/core/styles';
import { IconButton, Input } from "@material-ui/core";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto"; 
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";

import AutoSizeTextArea from "react-textarea-autosize";


import NewWindow from '../../../lib/Components/NewWindow';
import WebcamRenderer from '../../../lib/Components/WebcamRenderer';
import CapturedImage from '../../../lib/Components/CapturedImage';

import "./DiscussionActions.css";

const ENTER = 13;

const styles = {
    input: {
        display: "none"
    }
}

class DiscussionActions extends Component {
    constructor(props){
        super(props);

        this.state = {
            openCamera: false,
            pictureTaken: null,
            cameraPermissionAccepted: false // pas utilisé
        }

    }


    componentDidMount(){
        //this.sendInput.focus()
        this.checkCameraPermission();
    }


    componentDidUpdate(prevProps, prevState){
        const { canUpload } = this.props;
        const { openCamera } = this.state;
        // Peut etre rajouter une variable qui distingue quand la discussion change
        // ou dans shouldUpdate
        //this.sendInput.focus()

        // Control if uploads limit is reached
        if(!canUpload && openCamera){
            this.closeNewWindow();
        }  
    }


    onHandleKeyDown = (e) => {
        if(e.keyCode === ENTER){
            e.preventDefault();
            this._sendMessage(e);
        }
    }


    onHandleClickSend = (e) => {
        this._sendMessage(e);
    }


    onHandleFocus = (e) => {
        this.props.onFocusSendInput();
    }


    onHandleChange = (e) => {
        const { addUploads } = this.props;
        const filesToUpload = Array.from(this.uploadInput.files) || [];
        
        addUploads(filesToUpload); 
    }


    onInputValueChange = (e) => {
        const value = e.target.value;
        const { updateInputValue } = this.props;
        updateInputValue(value);
    }


    resetState = () => {
        this.setState({
            openCamera: false,
            pictureTaken: null,
            cameraPermissionAccepted: false
        });
    }


    _sendMessage = (e) => {
        const { triggerSendMessage } = this.props;
        triggerSendMessage();
    }


    _checkPermission = (permissionName) => {
        return navigator.permissions.query({name: permissionName})
    }


    checkCameraPermission = () => {
        return this._checkPermission("camera")
        .then(res => {
            res.state === "granted" 
            && this.setState({cameraPermissionAccepted: true})   
        })       
    }


    _promptCamera = () => {
        return navigator.mediaDevices
            .getUserMedia({video: true})
            .then(() => this.setState({cameraPermissionAccepted: true}))
            .catch(() => this.setState({cameraPermissionAccepted: false}));
    }

    onAcceptCamera = () => {
        this.setState({cameraPermissionAccepted: true})
    }


    openCamera = () => {
        this.setState({openCamera: true })
    }


    onTakeScreenshot = (imgData) => {
        if(!imgData)
            return;

        const pictureTaken = imgData;
        this.setState({pictureTaken});
    }


    onKeepPictureTaken = () => {
        const { pictureTaken } = this.state;
        const { addUploads } = this.props;

        const newUpload = {
            name:`screenshot${Date.now()}`,
            size: 0,
            preview: pictureTaken,
            type:"image/png"
        }

        addUploads(newUpload);

        this.setState({
            pictureTaken: null,
            openCamera: false
        });
    }


    onDeletePictureTaken = () => {
        this.setState({pictureTaken: null});
    }


    closeNewWindow = () => {
        this.setState({openCamera: false});
    }

    renderCameraWindow = () => {
        const { pictureTaken } = this.state;
        return (
            <NewWindow closeNewWindow={() => this.closeNewWindow()}>
                {
                    (windowHandle) => {
                        return (
                            pictureTaken === null
                            ? <WebcamRenderer 
                                onAcceptCamera={this.onAcceptCamera}
                                onTakeScreenshot={(img) => this.onTakeScreenshot(img)}
                                //onError={() => windowHandle.close()}

                            />
                            : <CapturedImage 
                                onAccept={this.onKeepPictureTaken}
                                onCancel={this.onDeletePictureTaken}
                                src={pictureTaken}
                            />
                        )
                        
                    }
                    
                }
            </NewWindow>
        )
    }


    render() {
        const { openCamera } = this.state;
        const { discId, inputValue, canUpload, classes } = this.props;

        return (
            <div className="actions__wrapper" >
                <div className="action__send-message">
                    <div className="action__textarea">
                        <Input
                            id="sendMessage"
                            placeholder="Send your message..."
                            inputProps={{
                                style: {resize: "none"},
                                "data-discid": discId,
                                maxRows: 4
                            }}
                            value={inputValue}
                            onChange={this.onInputValueChange}
                            onKeyDown= {this.onHandleKeyDown}
                            onFocus= {this.onHandleFocus}
                            inputComponent={AutoSizeTextArea}
                            className="textfield"
                            />
                    </div>
                    <div className="action__send_btn">
                        <IconButton style={{padding: "2px 12px"}} onClick={this.onHandleClickSend}>
                            <SendIcon />
                        </IconButton>
                    </div>
                    
                </div>
                <div className="secondary-actions__wrapper">
                    <input 
                        accept="image/*" 
                        className={classes.input} 
                        id="insert-photo" 
                        type="file" 
                        onChange={this.onHandleChange}
                        multiple
                        ref= {input => {this.uploadInput = input}}
                        disabled={!canUpload}
                    />
                    <label htmlFor="insert-photo">
                        <IconButton disabled={!canUpload} className={classes.button} component="span">
                            <InsertPhotoIcon />
                        </IconButton>
                    </label>
                    <IconButton disabled={!canUpload} onClick={this.openCamera} >
                        <PhotoCameraIcon />
                    </IconButton>
                </div>
                {
                    openCamera &&
                    this.renderCameraWindow()
                }
            </div>
        );
    }
}



export default withStyles(styles)(DiscussionActions);