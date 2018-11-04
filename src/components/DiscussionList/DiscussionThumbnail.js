import React, { Component } from 'react';
import './DiscussionThumbnail.css';

import carre from "../../images/entete-carre-magenta.png";

const maxMsgLength = 60;

class DiscussionThumbnail extends Component {

    render(){
        return (
            
            <div className="thumbnail-wrapper">

                <div className="friend-profile-picture">
                    <img src={this.props.friendsProfilePicture || carre} alt="friend profilepicture"/>
                </div>
                <div className="discussion-info-text">
                    <div className="friends-name">{this.props.friendsName}</div>
                    <div className="last-message">{getExtract(this.props.lastMessage, maxMsgLength)}</div>
                </div>
            
            </div>
        );
    }
}

const getExtract = (msg, maxLength) => {
    return msg.length > maxLength ? `${msg.substring(0, maxLength)}...` : msg;
}

export default DiscussionThumbnail;