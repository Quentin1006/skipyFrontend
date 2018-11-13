import React, { Component } from 'react';
import './DiscussionThumbnail.css';

import defaultpic from "../../images/weldon-Koelpig.png";

const maxMsgLength = 60;

class DiscussionThumbnail extends Component {

    render(){
        const { friendsProfilePicture, friendsName, lastMessage, unreadMessagesCount} = this.props;
        const extractOfLastMessage = getExtract(lastMessage, maxMsgLength)
        return (
            
            <div className="thumbnail__wrapper">

                <div className="thumbnail__profilepicture">
                    <img src={friendsProfilePicture || defaultpic} alt="friend profilepicture"/>
                </div>
                <div className="thumbnail__text">
                    <div className="thumbnail__text-friends-name">{friendsName}</div>
                    <div className="thumbnail__text-last-message">{extractOfLastMessage}</div>
                </div>
                <div className=".thumbnail__unread-messages">
                    <div>{unreadMessagesCount > 0 ? `(${unreadMessagesCount})` : ""}</div>
                </div>
            
            </div>
        );
    }
}

const getExtract = (msg, maxLength) => {
    return msg.length > maxLength ? `${msg.substring(0, maxLength)}...` : msg;
}

export default DiscussionThumbnail;