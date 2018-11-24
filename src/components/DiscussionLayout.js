import React, { Component } from 'react';


import DiscussionScreen from "./DiscussionLayout/DiscussionScreen";
import DiscussionHeader from "./DiscussionLayout/DiscussionHeader";
import DiscussionActions from "./DiscussionLayout/DiscussionActions";


import "./DiscussionLayout.css";


class DiscussionLayout extends Component {

    render() {
        const { 
            disc, 
            openDiscId, 
            markMessagesAsRead, 
            friendlist, 
            onSendMessage,
            fetchMatchingFriends,
            suggestions,
            setNewRecipient
        } = this.props;

        const { messages, user, friend } = disc;

        const isTempDisc = String(openDiscId).includes("temp");
       

        return (
            <div className="discussion-layout__container">
                <div className="discussion-header__container">
                    <DiscussionHeader 
                        user={user}
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
                    />
                </div>
                
            </div>
        );
    }
}




export default DiscussionLayout;