import React, { Component } from 'react';


import DiscussionScreen from "./DiscussionLayout/DiscussionScreen";
import DiscussionHeader from "./DiscussionLayout/DiscussionHeader";
import DiscussionActions from "./DiscussionLayout/DiscussionActions";


import { withStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto"; 
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera"; 



import "./DiscussionLayout.css";



const styles = theme => ({
    input: {
      display: 'none',
    },
  });


class DiscussionLayout extends Component {

    insertPhoto = () => {
        console.log("insert photo");
    }

    render() {
        const { 
            disc,
            profile,
            openDiscId, 
            markMessagesAsRead, 
            friendlist, 
            onSendMessage,
            fetchMatchingFriends,
            suggestions,
            setNewRecipient,
            classes
        } = this.props;

        const { messages, user, friend } = disc;

        const isTempDisc = String(openDiscId).includes("temp");
       

        return (
            <div className="discussion-layout__container">
                <div className="discussion-header__container">
                    <DiscussionHeader 
                        profile={profile}
                        friend={friend}
                        isTempDisc = {isTempDisc}
                        friendlist={friendlist}
                        fetchMatchingFriends={fetchMatchingFriends}
                        suggestions={suggestions}
                        setNewRecipient={setNewRecipient}
                    />
                </div>
                <div className="discussion-screen__container">
                    <DiscussionScreen 
                        discId={openDiscId}
                        messages={messages}
                        user={user}
                    />
                </div>
                
                <div className="discussion-action__container">
                    <DiscussionActions
                        onSendMessage={onSendMessage}
                        onFocusSendInput={markMessagesAsRead}
                        discId = {openDiscId}
                    >
                    <input accept="image/*" className={classes.input} id="insert-photo" type="file" />
                    <label htmlFor="insert-photo">
                        <IconButton className={classes.button} component="span">
                            <InsertPhotoIcon />
                        </IconButton>
                    </label>
                    <IconButton onClick={this.insertPhoto}>
                        <PhotoCameraIcon />
                    </IconButton>
                        

                    </DiscussionActions>
                    
                </div>
                
            </div>
        );
    }
}




export default withStyles(styles)(DiscussionLayout);