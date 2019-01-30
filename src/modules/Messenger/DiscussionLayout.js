import React, { Component } from 'react';

import DiscussionScreen from "./DiscussionLayout/DiscussionScreen";
import DiscussionHeader from "./DiscussionLayout/DiscussionHeader";
import DiscussionActions from "./DiscussionLayout/DiscussionActions";
import UploadsPreview from "./DiscussionLayout/UploadsPreview";

import Notification from "../../lib/Components/Notification"; 


import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

import Dropzone from "react-dropzone";
 

import "./DiscussionLayout.css";

const MAX_CONCURRENT_UPLOAD = 3;
let idGen = 0;
const generateId = () => (idGen++);

const styles = theme => ({
    headerContainer: {
        position: "relative",
        width:"100%",
        height:"80px",
        backgroundColor: "#eee",
    },
    gridContainer:{ 
        display: "flex",
        flexFlow: "column",
        height:"100%"
    }
  });


class DiscussionLayout extends Component {

    state = {
        uploadedImgs: [],
        nbUploads:0,
        inputValue:"",
        uploading:false,
        previewOpen: false,
        dropzoneActive: false,
        dropRejected: false
    };


    componentDidUpdate(prevProps, prevState) {
        const { updateWritingMessage, discId } = this.props;
        const { nbUploads, inputValue, dropRejected } = this.state;

        // Controls the togggling of the preview container
        if(prevState.nbUploads === 0 && nbUploads > 0){
            this.setState({previewOpen: true});
        }

        if(prevState.nbUploads > 0 && nbUploads === 0){
            this.setState({previewOpen: false});
        }

        // To detect when the user is writing
        if(
            prevProps.isWritingMessage
            && ( inputValue === "" && nbUploads === 0)
        ){
            updateWritingMessage(false);
        }

        if(
            !prevProps.isWritingMessage
            && ( inputValue !== "" || nbUploads > 0)
        ){
            updateWritingMessage(true);
        }

        // réinitialise pour une nouvelle conversation
        if(prevProps.discId !== discId){
            this.resetState();
        }


        // remettre automatiquement le state dropRejected a false
        if(dropRejected){
            window.setTimeout(() => this.cancelRejectNotif(), 1500)
            
        }
    }

    resetState = () => this.setState({
        uploadedImgs: [],
        nbUploads:0,
        inputValue:"",
        uploading:false,
        previewOpen: false,
        dropzoneActive: false
    })


    updateInputValue = (inputValue)  => {
        this.setState({inputValue})
    }


    updateUploadedImgs = (uploadedImg) => {
        this.setState(state => {
            uploadedImg.id = generateId();
            const uploadedImgs =[...state.uploadedImgs, uploadedImg]
            const nbUploads = uploadedImgs.length;
            return {
                ...state,
                nbUploads,
                uploadedImgs
            }
        })
    }


    uploadFileImg = (upload) => {
        this._readImageFile(upload)
        .then(image => {
            this.updateUploadedImgs(image)
        })
        .catch(console.log);
    }


    addUploads = (uploads) => {
        let { nbUploads } = this.state;

        uploads = Array.isArray(uploads) ? uploads : [uploads];
        while(nbUploads < MAX_CONCURRENT_UPLOAD && uploads[0]){
        
            if(uploads[0] instanceof Blob){
                this.uploadFileImg(uploads[0]);
            }
            else {
                this.updateUploadedImgs(uploads[0])
            }

            uploads.shift();
            nbUploads++;
        }        
    }


    deleteUpload = (id) => {
        this.setState(state => {
            const uploadedImgs= state.uploadedImgs.filter(upload => upload.id !== id);
            const nbUploads = uploadedImgs.length
            return {
                ...state,
                nbUploads,
                uploadedImgs 
            }  
        })
    }


    _readImageFile = (fileToUpload) => {
        const { name, size, type } = fileToUpload;
        const reader = new FileReader();

        return new Promise((resolve, reject) => {

            reader.onloadstart = () => {
                this.setState({uploading: true})
            }
    
            reader.onloadend = () => { 
                this.setState({uploading: false})
            }
        
            reader.onload = (e) => {
                const preview = e.target.result;
                const uploadedImg ={
                    name, 
                    size, 
                    type, 
                    preview, 
                }
                resolve(uploadedImg)
            }
    
            reader.onerror = reject;
    
            reader.onprogress = (e) => {
                console.log(e.loaded / e.total * 100);
            }
        
            reader.readAsDataURL(fileToUpload);
        })
    }


    onHandleSendMessage = () => {
        const { onSendMessage } = this.props;
        const { uploadedImgs, inputValue } = this.state;
        const msg = inputValue.trim();
        //const uploads = JSON.parse(JSON.stringify(uploadedImgs));

        if(msg !== "" || uploadedImgs.length > 0){
            onSendMessage(msg, uploadedImgs);
            this.resetState();
        }
    }

    onDragEnter = (ev) => {   
        ev.preventDefault();
        this.setState({dropzoneActive: true});
    }
    
    onDragLeave = () => {
        this.setState({dropzoneActive: false});
    }
    
    onDrop = () => {
        this.setState({dropzoneActive: false});
    }

    onDropRejected = (uploads) => {
        this.setState({dropRejected: true});
    }

    cancelRejectNotif = () => {
        this.setState({dropRejected: false});
    }


    render() {
        const { 
            previewOpen,
            uploadedImgs,
            nbUploads,
            inputValue,
            dropzoneActive,
            dropRejected
        } = this.state;

        const { 
            disc,
            profile,
            discId, 
            markMessagesAsRead, 
            friendlist, 
            fetchMatchingFriends,
            suggestions,
            setNewRecipient,
            sendMessageStatus,
            classes
        } = this.props;

        const { messages, user, friend } = disc;
        const isTempDisc = String(discId).includes("temp");
        const canUpload = nbUploads < MAX_CONCURRENT_UPLOAD;
       
        return (
            <Dropzone
                disabled={!canUpload}
                onDropAccepted={this.addUploads}
                onDropRejected={this.onDropRejected}
                onDrop={this.onDrop}
                onDragLeave={this.onDragLeave}
                onDragEnter={this.onDragEnter}
                disableClick
                accept={"image/*"}
                style={{height:"100%", width:"100%"}}
            >
                {
                    dropRejected && 
                    <Notification 
                        close={this.cancelRejectNotif}
                        type="error"
                        message={"Your file was not accepted"}
                    />
                }
                
                { 
                    dropzoneActive && 
                    <div className={"discussion-layout__dropzone"}>
                        <div className={"discussion-layout__dropzone-content"}>
                            Drop Your Files...
                        </div>
                        
                    </div> 
                }

                <div className="discussion-layout__container">
                    <Grid 
                        direction={"column"} 
                        container 
                        spacing={0} 
                        className={classes.gridContainer}
                    >
                        <Grid 
                            item 
                            className="discussion-header__container"
                        >

                            <DiscussionHeader 
                                profile={profile}
                                friend={friend}
                                isTempDisc = {isTempDisc}
                                friendlist={friendlist}
                                fetchMatchingFriends={fetchMatchingFriends}
                                suggestions={suggestions}
                                setNewRecipient={setNewRecipient}

                            />
                        </Grid>

                        <Grid 
                            item 
                            ref={screen => {
                                this.screen = screen;
                            }}
                            className="discussion-screen__container">

                                <DiscussionScreen 
                                    discId={discId}
                                    messages={messages}
                                    user={user}
                                    sendMessageStatus={sendMessageStatus}
                                />
                        </Grid>
                        
                        {
                            previewOpen && 
                            <Grid
                                item
                                className="discussion-preview__container"
                            >
                                <UploadsPreview 
                                    uploads={uploadedImgs}
                                    deleteUpload={this.deleteUpload}
                                />
                            </Grid>
                        }
                        
                        <Grid 
                            className="discussion-action__container"
                            ref={tarea => {
                                this.tarea = tarea;
                            }}      
                        >

                            <DiscussionActions
                                triggerSendMessage={this.onHandleSendMessage}
                                onFocusSendInput={markMessagesAsRead}
                                discId = {discId}
                                updateInputValue={this.updateInputValue}
                                addUploads={this.addUploads}
                                inputValue = {inputValue}
                                canUpload={canUpload}
                            >
                            </DiscussionActions>
                            
                        </Grid>
                    </Grid>
                
                </div>
            </Dropzone>
        );
    }
}




export default withStyles(styles)(DiscussionLayout);