import React, { Component } from 'react';

import { connect } from "react-redux";
import io from "socket.io-client"

import DiscussionScreen from "./DiscussionLayout/DiscussionScreen";
import DiscussionHeader from "./DiscussionLayout/DiscussionHeader";
import DiscussionActions from "./DiscussionLayout/DiscussionActions";


import { 
    start_send_message,
    confirmation_send_message

} from "../actions/discussions";

import Logger from "../lib/Logger"; 
import server from "../config/server";

import "./DiscussionLayout.css";

const logger = new Logger("DiscussionLayout");



class DiscussionLayout extends Component {

    constructor(props){
        super(props);

        const { responseSendMessage } = this.props;

        this.sock = io.connect(`${server.url}/messages`);

        this.sock.on("sendMessage response", (msg, discId) => {
            logger.info(msg);
            responseSendMessage(msg, discId);
        });

        this.onSendMessage = this.onSendMessage.bind(this);
    }


    onSendMessage(content){
        const { initSendMessage, openDiscId, disc } = this.props;

        const to = disc.friend.id;
        const msg = {content, to};
        logger.info(msg);

        this.sock.emit("sendMessage", openDiscId, msg);

        initSendMessage();
    }


    render() {
        const { disc, openDiscId } = this.props;
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
                        discId={openDiscId}
                        messages={messages}
                        user={user}
                    />
                </div>
                
                <div className="discussion-action__container">
                    <DiscussionActions
                        onSendMessage={this.onSendMessage}
                    />
                </div>
                
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { openDiscId } = state
    return {
        openDiscId,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        initSendMessage : () => dispatch(start_send_message()),
        responseSendMessage: (msg, discId) => dispatch(confirmation_send_message(msg, discId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionLayout);