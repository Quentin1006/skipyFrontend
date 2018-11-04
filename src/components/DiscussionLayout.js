import React, { Component } from 'react';

import DiscussionScreen from "./DiscussionLayout/DiscussionScreen";
import DiscussionHeader from "./DiscussionLayout/DiscussionHeader";
import DiscussionActions from "./DiscussionLayout/DiscussionActions";


import Logger from "../lib/Logger"; 

import "./DiscussionLayout.css";

const logger = new Logger("DiscussionLayout");

class DiscussionLayout extends Component {
    constructor(props){
        super(props);

        this.sendMessage = this.sendMessage.bind(this);
    }


    sendMessage(msg){
        logger.info(msg);
    }


    render() {
        const { disc } = this.props;
        const { messages, user, friend } = disc;

        // const users = {
        //     [user.id]: user,
        //     [friend.id]: friend
        // }

        return (
            <div className="discussion-layout__container">
                <div className="discussion-header__container">
                    <DiscussionHeader 
                        user={user}
                        friend={friend}
                    />
                </div>
                <div className="discussion-screen__container">
                    <DiscussionScreen 
                        messages={messages}
                        user={user}
                    />
                </div>
                
                <div className="discussion-action__container">
                    <DiscussionActions
                        onSendMessage={this.sendMessage}
                    />
                </div>
                
            </div>
        );
    }
}

export default DiscussionLayout;