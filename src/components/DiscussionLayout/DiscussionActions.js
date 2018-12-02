import React, { Component } from 'react';

import AutoGrowTextArea from "../../lib/Components/AutoGrowTextarea";
import PreviewImage from "../../lib/Components/PreviewImage";

import { IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto"; 
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import "./DiscussionActions.css";

const ENTER = 13;
const MAX_CONCURRENT_UPLOAD = 3;
// NE PAS LE LAISSER EN DUR
const PREVIEW_HEIGHT = 132;

let idGen = 0;

const styles = {
    input: {
        display: "none"
    }
}

class DiscussionActions extends Component {
    constructor(props){
        super(props);

        this.state = {
            uploadedImgs : [],
            nbUploaded: 0,
            uploading: false,
            previewOpen: false
        }


        // this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
        // this.onHandleFocus = this.onHandleFocus.bind(this);
    }

    componentDidMount(){
        //this.sendInput.focus()
        console.log("previewWrapper", this.previewWrapper)
    }

    componentDidUpdate(prevProps, prevState){
        const { onElementSizeChanged } = this.props;
        // Peut etre rajouter une variable qui distingue quand la discussion change
        // ou dans shouldUpdate
        //this.sendInput.focus()
        if(!prevState.previewOpen && this.state.previewOpen){
            onElementSizeChanged(PREVIEW_HEIGHT);
        }

        if(prevState.previewOpen && !this.state.previewOpen){
            onElementSizeChanged(-PREVIEW_HEIGHT);
        }
        
    }

    onHandleKeyDown = (e) => {
        const { onSendMessage } = this.props;
        if(e.keyCode === ENTER){
            const msg = (e.currentTarget.value).trim();

            if(msg !== ""){
                onSendMessage(msg);
                e.currentTarget.value = "";
            }
        }
    }

    onHandleFocus = (e) => {
        this.props.onFocusSendInput();
    }

    insertPhoto = () => {
        console.log("insert photo");
    }

    previewImage = (fileToUpload) => {
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
                    {name, size, type, preview, id:idGen++}
                ]
            }));
           
        }

        reader.onerror = (e) => { console.log("error")}

        reader.onprogress = (e) => {
            console.log(e.loaded / e.total * 100);
        }
    
        reader.readAsDataURL(fileToUpload);
    }

    onHandleChange = (e) => {
        //const { onElementSizeChanged } = this.props;
        let { nbUploaded, previewOpen } = this.state;
        const filesToUpload = Array.from(this.uploadInput.files) || [];
        // boucle sur le nombre d'item uploadés
        while(nbUploaded < MAX_CONCURRENT_UPLOAD && filesToUpload[0]){
            this.previewImage(filesToUpload[0]);

            filesToUpload.shift();
            nbUploaded++;

            // If we upload the first file
            previewOpen = (nbUploaded >= 1);
        }

        this.setState( state => ({...state, nbUploaded, previewOpen}))
        
    }

    closePreview = (id) => {
        let previewExists = false;
        const uploadedImgs = this.state.uploadedImgs.filter(upload => {
            if(upload.id === id)
                previewExists =false;

            return upload.id !== id
        });

        const nbUploaded = uploadedImgs.length;

        const previewOpen = nbUploaded > 0;

        this.setState(state => ({
            ...state,
            previewOpen,
            nbUploaded,
            uploadedImgs
        }))
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
        const { uploadedImgs, nbUploaded } = this.state;
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
                    <AutoGrowTextArea 
                        
                        inputProps= {{
                            id:"sendMessage",
                            "data-discid": discId,
                            placeholder:"Send your message...",
                            onFocus: this.onHandleFocus,
                            onKeyDown: this.onHandleKeyDown 
                        }} 
                        ref={(input) => { this.sendInput = input; }} 
                        onInputSizeChanged={onElementSizeChanged}
                    />
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
                    <IconButton onClick={this.insertPhoto} >
                        <PhotoCameraIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DiscussionActions);