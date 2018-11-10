import React, { Component } from 'react';

import { connect } from "react-redux";
import io from "socket.io-client"

import DiscussionList from "../components/DiscussionList";
import DiscussionLayout from "../components/DiscussionLayout";
import WelcomeLayout from "../components/WelcomeLayout";


import { 
    send_message,
    receive_message_from_server,
    get_discussion,
    mark_as_read

} from "../actions/discussions";


import Logger from "../lib/Logger"; 
import server from "../config/server";


import "./MainBoard.css";



const logger = new Logger("DiscussionLayout");


class MainBoard extends Component {

    constructor(props){
        super(props);
        const { discussions, messageFromServer, markDiscMessageAsRead } = this.props;


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


        this.sock.on("markAsSeen response", (discId, done) => {
            if(done){
                markDiscMessageAsRead(discId)
            }
        })

        this.onSendMessage = this.onSendMessage.bind(this);
        this.openDiscussion = this.openDiscussion.bind(this);
        this.markMessagesAsRead = this.markMessagesAsRead.bind(this);
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


    onSendMessage(content){
        const { initSendMessage, openDiscId, discOpened } = this.props;

        const to = discOpened.friend.id;
        const msg = {content, to};
        logger.info(msg);

        this.sock.emit("sendMessage", openDiscId, msg);

        initSendMessage();
    }


    markMessagesAsRead(){
        const { discOpened } = this.props
        this.sock.emit("markAsSeen", discOpened.id);
    }



    openDiscussion(id){
        const { 
            openDiscId, 
            getDiscussion,
            /*recentlyOpenedDiscussions*/ 
        } = this.props;

        if(openDiscId === id){
            logger.info("Discussion already open");
            return;
        }

        // const discInCache = recentlyOpenedDiscussions.find(id);
        // if(discInCache){
        //     logger.info("discussion is in cache");
        //     dispatch(get_discussion_from_cache(discInCache));
        //     return;
        // }

        getDiscussion(id);            
    }

    


    render() {
        const { isDiscOpened, openDiscId, profile, discOpened} = this.props;
        
        
        return (
            <div className="mainboard__wrapper">
                <div className="discussions-list__wrapper">
                    <DiscussionList 
                        discussions={this.discsOverview} 
                        listItemClick = {this.openDiscussion} />  
                </div>
                <div className="discussion-content__wrapper">
                    {isDiscOpened 
                        ?   <DiscussionLayout 
                                disc={discOpened}
                                openDiscId= {openDiscId}
                                onSendMessage={this.onSendMessage}
                                markMessagesAsRead= {this.markMessagesAsRead}
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
            friendsProfilePicture: friends.profilepicture,
            lastMessage:disc.lastMessage.content || "",
            unreadMessagesCount: disc.unreadMessagesCount
        }
    });
}


const mapStateToProps = (state) => {
    const { openDiscId } = state;

    return {
        openDiscId,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        initSendMessage : () => dispatch(send_message()),
        messageFromServer: (msg, discId) => dispatch(receive_message_from_server(msg, discId)),
        getDiscussion: (discId) => dispatch(get_discussion(discId)),
        markDiscMessageAsRead: (discId) => dispatch(mark_as_read(discId))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);