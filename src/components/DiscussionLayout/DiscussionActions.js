import React, { Component } from 'react';

import AutoGrowTextArea from "../../lib/Components/AutoGrowTextarea";
import PreviewImage from "../../lib/Components/PreviewImage";

import { IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto"; 
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

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
            uploadedImgs : [],
            nbUploaded: 0,
            uploading: false
        }

        this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
        this.onHandleFocus = this.onHandleFocus.bind(this);
    }

    componentDidMount(){
        //this.sendInput.focus()
    }

    componentDidUpdate(){
        // Peut etre rajouter une variable qui distingue quand la discussion change
        // ou dans shouldUpdate
        //this.sendInput.focus()
    }

    onHandleKeyDown(e){
        const { onSendMessage } = this.props;
        if(e.keyCode === ENTER){
            const msg = (e.currentTarget.value).trim();

            if(msg !== ""){
                onSendMessage(msg);
                e.currentTarget.value = "";
            }
        }
    }

    onHandleFocus(e){
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
                    {name, size, type, preview}
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
        let { nbUploaded } = this.state;
        let filesToUpload = Array.from(this.uploadInput.files) || [];
        // boucle sur le nombre d'item uploadés
        while(nbUploaded < 3 && filesToUpload[0]){
            this.previewImage(filesToUpload[0]);

            filesToUpload.shift();
            nbUploaded++;
        }
        


        this.setState( state => ({...state, nbUploaded}))
        
    }


    renderPreview = () => {
        const { uploadedImgs } = this.state;

        return (
            <div className="action__preview-wrapper">
                { uploadedImgs.map(upload => (
                    <PreviewImage src={upload.preview} className="action__preview-image"/>
                )) }
            </div>
        )
    }


    render() {
        const { uploadedImgs } = this.state;
        const { discId, onInputSizeChanged, classes } = this.props;

        return (
            <div className="actions__wrapper">
                {
                    uploadedImgs.length > 0 
                    && this.renderPreview()
                }
               
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
                        onInputSizeChanged={onInputSizeChanged}
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
                    />
                    <label htmlFor="insert-photo">
                        <IconButton className={classes.button} component="span">
                            <InsertPhotoIcon />
                        </IconButton>
                    </label>
                    <IconButton onClick={this.insertPhoto}>
                        <PhotoCameraIcon />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DiscussionActions);