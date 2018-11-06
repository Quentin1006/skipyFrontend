import React, { Component } from 'react';

import { connect } from "react-redux";
import io from "socket.io-client"

import DiscussionList from "../components/DiscussionList";
import DiscussionLayout from "../components/DiscussionLayout";
import WelcomeLayout from "../components/WelcomeLayout";


import { 
    send_message,
    receive_message_from_server

} from "../actions/discussions";


import Logger from "../lib/Logger"; 
import server from "../config/server";


import "./MainBoard.css";



const logger = new Logger("DiscussionLayout");


class MainBoard extends Component {

    constructor(props){
        super(props);
        const { discussions, messageFromServer } = this.props;


        this.discsOverview = getOverview(discussions);

        this.sock = io.connect(`${server.url}/messages`);

        // Doit fonctionner pour la reception de la confirmation de son propre message
        // ainsi que pour la reception d'un message destiné au client
        // peut etre faudrait il changer le nom de l'event
        this.sock.on("sendMessage response", (msg, discId) => {
            logger.info(msg);
            messageFromServer(msg, discId);
        });

        this.sock.on("conn", (id) => {
            logger.info("id of socket", id);
        })

        this.onSendMessage = this.onSendMessage.bind(this);
    }


    onSendMessage(content){
        const { initSendMessage, openDiscId, discOpened } = this.props;

        const to = discOpened.friend.id;
        const msg = {content, to};
        logger.info(msg);

        this.sock.emit("sendMessage", openDiscId, msg);

        initSendMessage();
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.discussions && nextProps.discussions !== this.props.discussions){
            this.discsOverview = getOverview(nextProps.discussions)
            return true;
        }

        if(nextProps.discOpened !== this.discOpened){
            return true;
        }
        return false;
    }


    render() {
        const { isDiscOpened, profile, discOpened} = this.props;
        
        
        return (
            <div className="mainboard__wrapper">
                <div className="discussions-list__wrapper">
                    <DiscussionList 
                        discussions={this.discsOverview} 
                        listItemClick = {this.props.listItemClick} />  
                </div>
                <div className="discussion-content__wrapper">
                    {isDiscOpened 
                        ?   <DiscussionLayout 
                                disc={discOpened}
                                onSendMessage={this.onSendMessage}
                            /> 
                        :   <WelcomeLayout userProfile={profile} />}
                </div>
            
            </div>
        );
    }
}


const getOverview = (discussions) => {
    return discussions.map( disc => {
        const friends = disc.with;
        return {
            id: disc.id,
            friendsName: `${friends.firstname} ${friends.lastname}`,
            friendsProfilePicture:friends.profilepicture,
            lastMessage:disc.lastMessage.content || ""
        }
    });
}


const mapStateToProps = (state) => {
    const { openDiscId } = state
    return {
        openDiscId,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        initSendMessage : () => dispatch(send_message()),
        messageFromServer: (msg, discId) => dispatch(receive_message_from_server(msg, discId))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);