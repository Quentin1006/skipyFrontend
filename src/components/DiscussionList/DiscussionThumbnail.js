import React, { Component } from 'react';
import './DiscussionThumbnail.css';

import carre from "../../images/entete-carre-magenta.png";

const maxMsgLength = 60;

class DiscussionThumbnail extends Component {

    render(){
        const { friendsProfilePicture, friendsName, lastMessage} = this.props;
        const extractOfLastMessage = getExtract(lastMessage, maxMsgLength)
        return (
            
            <div className="thumbnail-wrapper">

                <div className="friend-profile-picture">
                    <img src={friendsProfilePicture || carre} alt="friend profilepicture"/>
                </div>
                <div className="discussion-info-text">
                    <div className="friends-name">{friendsName}</div>
                    <div className="last-message">{extractOfLastMessage}</div>
                </div>
            
            </div>
        );
    }
}

const getExtract = (msg, maxLength) => {
    return msg.length > maxLength ? `${msg.substring(0, maxLength)}...` : msg;
}

export default DiscussionThumbnail;