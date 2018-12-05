import React, { Component } from 'react';



import { withStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto"; 
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SendIcon from "@material-ui/icons/Send";

import AutoGrowTextArea from "../../lib/Components/AutoGrowTextarea";
import PreviewImage from "../../lib/Components/PreviewImage";
import NewWindow from '../../lib/Components/NewWindow';
import WebcamRenderer from '../../lib/Components/WebcamRenderer';
import CapturedImage from '../../lib/Components/CapturedImage';

import "./DiscussionActions.css";

const ENTER = 13;
const MAX_CONCURRENT_UPLOAD = 3;
// NE PAS LE LAISSER EN DUR
const PREVIEW_HEIGHT = 132;

let idGen = 0;
const generateId = () => (idGen++);

const styles = {
    input: {
        display: "none"
    }
}

class DiscussionActions extends Component {
    constructor(props){
        super(props);

        this.state = {
            inputValue:"",
            uploadedImgs : [],
            nbUploaded: 0,
            uploading: false,
            previewOpen: false,
            cameraOpen: false,
            pictureTaken: null
        }


        // this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
        // this.onHandleFocus = this.onHandleFocus.bind(this);
    }


    componentDidMount(){
        //this.sendInput.focus()
    }


    componentDidUpdate(prevProps, prevState){
        const { onElementSizeChanged } = this.props;
        const { nbUploaded, cameraOpen } = this.state;
        // Peut etre rajouter une variable qui distingue quand la discussion change
        // ou dans shouldUpdate
        //this.sendInput.focus()
        if(prevState.nbUploaded === 0 && nbUploaded > 0){
            onElementSizeChanged(PREVIEW_HEIGHT);
        }


        if(prevState.nbUploaded > 0 && nbUploaded === 0){
            onElementSizeChanged(-PREVIEW_HEIGHT);
        }

        if(nbUploaded === MAX_CONCURRENT_UPLOAD && cameraOpen){
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
        const filesToUpload = Array.from(this.uploadInput.files) || [];
        this._addPictureToUploads(filesToUpload); 
    }


    onInputValueChange = (inputValue) => {
        this.setState(state => ({...state, inputValue}))
    }


    _sendMessage = (e) => {
        const { onSendMessage } = this.props;
        const { inputValue, uploadedImgs } = this.state;

        const msg = inputValue.trim();
        if(msg !== "" || uploadedImgs.length > 0){
            onSendMessage(msg, uploadedImgs);
            this.setState(state => ({
                ...state, 
                inputValue: "", 
                uploadedImgs:[],
                nbUploaded: 0
            }));
        }
    }

    
    _previewImage = (fileToUpload) => {
        const { name, size, type } = fileToUpload;
        const reader = new FileReader();

        reader.onloadstart = () => {
            this.setState(state => ({...state, uploading: true}))
        }

        reader.onloadend = () => { 
            this.setState(state => ({...state, uploading: false}))
        }
    
        reader.onload = (e) => {
            const preview = e.target.result;
            this.setState(state => ({
                ...state, 
                uploadedImgs: [
                    ...state.uploadedImgs, 
                    {name, size, type, preview, id:generateId()}
                ]
            }));
           
        }

        reader.onerror = (e) => { console.log("error")}

        reader.onprogress = (e) => {
            console.log(e.loaded / e.total * 100);
        }
    
        reader.readAsDataURL(fileToUpload);
    }


    _addPictureToUploads = (filesToUpload) => {
        //const { onElementSizeChanged } = this.props;
        let { nbUploaded, previewOpen } = this.state;
        // boucle sur le nombre d'item uploadés
        while(nbUploaded < MAX_CONCURRENT_UPLOAD && filesToUpload[0]){
            this._previewImage(filesToUpload[0]);

            filesToUpload.shift();
            nbUploaded++;

            // If we upload the first file
            previewOpen = (nbUploaded >= 1);
        }

        this.setState( state => ({...state, nbUploaded, previewOpen}))
    }

    
    closePreview = (id) => {
       
        const uploadedImgs = this.state.uploadedImgs.filter(upload => upload.id !== id);
        const nbUploaded = uploadedImgs.length;
        const previewOpen = nbUploaded > 0;

        this.setState(state => ({
            ...state,
            previewOpen,
            nbUploaded,
            uploadedImgs
        }))
    }


    takePhoto = () => {
        this.setState(state => ({ ...state, cameraOpen: true }));
    }


    onTakeScreenshot = (imgData) => {
        if(!imgData)
            return;

        const pictureTaken = imgData;
        this.setState(state => ({...state, pictureTaken}));
    }


    onKeepPictureTaken = () => {
        const { pictureTaken, nbUploaded } = this.state;

        if(nbUploaded < MAX_CONCURRENT_UPLOAD){
            const id = generateId();
            const newUpload = {
                id,
                name:`screenshot${id}`,
                size: 0,
                preview: pictureTaken,
                type:"image/png"
            }


            this.setState(state => ({ 
                ...state, 
                uploadedImgs: [
                    ...state.uploadedImgs,
                    newUpload
                ],
                nbUploaded:nbUploaded+1,
                pictureTaken: null,
                cameraOpen: false
            }));
        }
        
        // This function expects an array as argument
        
    }


    onDeletePictureTaken = () => {
        this.setState(state => ({...state, pictureTaken: null}))
    }


    closeNewWindow = () => {
        this.setState(state => ({...state, cameraOpen: false}))
    }


    renderCameraWindow = () => {
        const { pictureTaken } = this.state;
        return (
            <NewWindow closeNewWindow={() => this.closeNewWindow()}>
                {
                    pictureTaken === null
                    ? <WebcamRenderer onTakeScreenshot={(img) => this.onTakeScreenshot(img)}/>
                    : <CapturedImage 
                        onAccept={this.onKeepPictureTaken}
                        onCancel={this.onDeletePictureTaken}
                        src={pictureTaken}
                      />
                }
            </NewWindow>
        )
    }


    renderPreview = () => {
        const { uploadedImgs } = this.state;

        return (
                 uploadedImgs.map((upload) => (
                    <PreviewImage 
                        key={upload.id} 
                        id={upload.id}
                        src={upload.preview} 
                        className="action__preview-image"
                        closePreview={this.closePreview}
                    />
                ))
        )
    }


    render() {
        const { uploadedImgs, nbUploaded, cameraOpen } = this.state;
        const { discId, onElementSizeChanged, classes } = this.props;
        const canUpload = nbUploaded < MAX_CONCURRENT_UPLOAD;

        return (
            <div className="actions__wrapper" >
                <div className="action__preview-container" ref={preview => {this.previewWrapper = preview}}>
                {  
                        uploadedImgs.length > 0 
                        && 
                        <div className="action__preview-wrapper" > 
                            {this.renderPreview()}
                        </div>
                }
                </div>
               
                <div className="action__send-message">
                    <div className="action__textarea">
                        <AutoGrowTextArea 
                            
                            inputProps= {{
                                id:"sendMessage",
                                "data-discid": discId,
                                placeholder:"Send your message...",
                                onFocus: this.onHandleFocus,
                                onKeyDown: this.onHandleKeyDown,
                                value: this.state.inputValue
                                
                            }} 
                            ref={(input) => { this.sendInput = input; }}
                            onInputValueChange= {this.onInputValueChange}
                            onInputSizeChanged={onElementSizeChanged}
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
                    <IconButton disabled={!canUpload} onClick={this.takePhoto} >
                        <PhotoCameraIcon />
                        {cameraOpen && this.renderCameraWindow()}
                    </IconButton>
                </div>
            </div>
        );
    }
}



export default withStyles(styles)(DiscussionActions);