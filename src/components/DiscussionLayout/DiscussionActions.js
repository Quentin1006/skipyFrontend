import React, { Component } from 'react';



import { withStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto"; 
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";

import AutoGrowTextArea from "../../lib/Components/AutoGrowTextarea";

import NewWindow from '../../lib/Components/NewWindow';
import WebcamRenderer from '../../lib/Components/WebcamRenderer';
import CapturedImage from '../../lib/Components/CapturedImage';

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
            cameraOpen: false,
            pictureTaken: null,
            cameraPermissionAccepted: false
        }


        // this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
        // this.onHandleFocus = this.onHandleFocus.bind(this);
    }


    componentDidMount(){
        //this.sendInput.focus()
    }


    componentDidUpdate(prevProps, prevState){
        const { canUpload } = this.props;
        const { cameraOpen } = this.state;
        // Peut etre rajouter une variable qui distingue quand la discussion change
        // ou dans shouldUpdate
        //this.sendInput.focus()

        // Control if uploads limit is reached
        if(!canUpload && cameraOpen){
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


    onInputValueChange = (inputValue) => {
        const { updateMessageText } = this.props;
        updateMessageText(inputValue);
    }


    resetState = () => {
        this.setState({
            cameraOpen: false,
            pictureTaken: null,
            videoPermissionAccepted: false
        });
    }


    _sendMessage = (e) => {
        const { triggerSendMessage } = this.props;
        triggerSendMessage();
    }


    // _checkPermission = (permissionName) => {
    //     return navigator.permissions.query({name: permissionName})
    // }


    // checkCameraPermission = () => {
    //     return this._checkPermission("camera")
    //     .then(res => {
    //         res.state === "granted" 
    //         && this.setState({cameraPermissionAccepted: true})   
    //     })       
    // }


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
        this.setState({cameraOpen: true })        
    }


    onTakeScreenshot = (imgData) => {
        if(!imgData)
            return;

        const pictureTaken = imgData;
        this.setState(state => ({...state, pictureTaken}));
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
            cameraOpen: false
        });
    }


    onDeletePictureTaken = () => {
        this.setState(state => ({...state, pictureTaken: null}))
    }


    closeNewWindow = () => {
        this.setState(state => ({...state, cameraOpen: false}))
    }

    renderCameraWindow = () => {
        const { pictureTaken, cameraPermissionAccepted } = this.state;
        return (
            <NewWindow updater={cameraPermissionAccepted} closeNewWindow={() => this.closeNewWindow()}>
                {
                    pictureTaken === null
                    ? <WebcamRenderer 
                        onAcceptCamera={this.onAcceptCamera}
                        onTakeScreenshot={(img) => this.onTakeScreenshot(img)}

                    />
                    : <CapturedImage 
                        onAccept={this.onKeepPictureTaken}
                        onCancel={this.onDeletePictureTaken}
                        src={pictureTaken}
                      />
                }
            </NewWindow>
        )
    }


    render() {
        const { cameraOpen, videoPermissionAccepted } = this.state;
        const { discId, canUpload, inputValue, classes } = this.props;

        return (
            <div className="actions__wrapper" >
                <div className="action__send-message">
                    <div className="action__textarea">
                        <AutoGrowTextArea 
                            
                            inputProps= {{
                                id:"sendMessage",
                                "data-discid": discId,
                                placeholder:"Send your message...",
                                onFocus: this.onHandleFocus,
                                onKeyDown: this.onHandleKeyDown,
                                value: inputValue
                                
                            }} 
                            ref={(input) => { this.sendInput = input; }}
                            onInputValueChange= {this.onInputValueChange}
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
                    cameraOpen &&
                    this.renderCameraWindow()
                }
            </div>
        );
    }
}



export default withStyles(styles)(DiscussionActions);