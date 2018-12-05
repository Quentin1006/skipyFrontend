import React, { Component } from 'react';

import Badge from "@material-ui/core/Badge";
import PhotoIcon from "@material-ui/icons/Photo";



import './DiscussionThumbnail.css';

import defaultpic from "../../images/weldon-Koelpig.png";

const maxMsgLength = 45;

class DiscussionThumbnail extends Component {

    render(){
        const { friendsProfilePicture, friendsName, lastMessage, unreadMessagesCount} = this.props;
        const extractOfLastMessage = getExtract(lastMessage, maxMsgLength);
        const lastMessageIsText =  extractOfLastMessage.length !== 0;

        return (
            
            <div className="thumbnail__wrapper">

                <div className="thumbnail__profilepicture">
                    <img src={friendsProfilePicture || defaultpic} alt="friend profilepicture"/>
                </div>
                <div className="thumbnail__text">
                    <div className="thumbnail__text-friends-name">{friendsName}</div>
                    <div className="thumbnail__text-last-message">
                        {
                            lastMessageIsText 
                            ? extractOfLastMessage 
                            : <div><PhotoIcon /> image</div>
                        }
                    </div>
                </div>
                <div className="thumbnail__unread-messages v-center set-right">
                    {
                        unreadMessagesCount > 0 
                        && <Badge badgeContent={unreadMessagesCount} color="primary">""</Badge>
                    }
                    
                </div>
            
            </div>
        );
    }
}

const getExtract = (msg, maxLength) => {
    return msg.length > maxLength ? `${msg.substring(0, maxLength)}...` : msg;
}

export default DiscussionThumbnail;