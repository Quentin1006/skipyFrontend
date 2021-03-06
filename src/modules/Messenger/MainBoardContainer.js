import React, { Component } from 'react';

import { connect } from "react-redux";
import io from "socket.io-client";

import { 
    IconButton
} from "@material-ui/core";
import MessageIcon from "@material-ui/icons/Message";

import DiscussionList from "./DiscussionList";
import DiscussionLayout from "./DiscussionLayout";
import WelcomeLayout from "./WelcomeLayout";
import ShowLeaveDiscussionDialog from "./ShowLeaveDiscussionDialog";


import { 
    send_message,
    get_discussion,
    mark_as_read,
    change_disc_id,
    create_temp_disc,
    set_recipient_temp,
    set_possible_recipients_temp,
    receive_user_discs,
    update_discussion,
    update_discussions_overview,
    close_temp_disc


} from "../../actions/discussions";


import Logger from "../../lib/Logger"; 
import server from "../../config/server";
import {
    NOT_SENDING , 
    SENDING_MESSAGE, 
    SENDING_SUCCESS, 
    SENDING_FAILURE
} from "../../config";

import "./MainBoard.css";



const logger = new Logger("DiscussionLayout");

const _discussionWasCreated = (prevId, nextId) => {
    prevId = String(prevId);
    nextId = String(nextId);
    return prevId !== nextId && prevId.includes("temp")
}

class MainBoard extends Component {

    constructor(props){
        super(props);
        const { 
            discussionsOverview,  
            markDiscMessageAsRead,
            changeOpenedDiscId
        } = this.props;

        this.state = {
            sendMessageStatus: NOT_SENDING,
            isWritingMessage: false,
            showLeaveDiscussionDialog: false,
            discIdRequested: -1
        }

        this.discsOverview = getOverview(discussionsOverview);

        this.sock = io.connect(`${server.url}/messages`);


        this.sock.on("conn", (id) => {
            logger.info("id of socket", id);
        })

        // Doit fonctionner pour la reception de la confirmation de son propre message
        // ainsi que pour la reception d'un message destiné au client
        // peut etre faudrait il changer le nom de l'event
        this.sock.on("sendMessage response", (resp) => {
            const { 
                closeTempDisc, 
                getDiscussion, 
                discussions, 
                updateDiscussion, 
                updateDiscussionsOverview 
            } = this.props;

            const { builtMsg, discUpdatedId, discRequestedId } = resp; 
            logger.info(resp);

            if(_discussionWasCreated(discRequestedId, discUpdatedId)){
                this.requestLastActiveDiscussions();
                closeTempDisc();
                changeOpenedDiscId(discUpdatedId);
                
            }
            else {
                updateDiscussionsOverview(discUpdatedId, builtMsg)
            }

            //si la discussion n'est pas chez le client
            if(!discussions[discUpdatedId]){
                getDiscussion(discUpdatedId);
            }
            else {
                updateDiscussion(discUpdatedId, builtMsg);
            }

            this.setState({sendMessageStatus:SENDING_SUCCESS});
        });


        this.sock.on("markAsSeen response", (discId, done) => {
            if(done){
                markDiscMessageAsRead(discId)
            }
        });


        this.sock.on("retrieveActiveDiscs",  (discs) => {
            const { receiveUserDiscs } = this.props;
            receiveUserDiscs(discs);
        })


        this.sock.on("matchFriends response", (matches) => {
            const {setPossibleRecipientsToTemp} = this.props;

            setPossibleRecipientsToTemp(matches);
            
        })

    }

    componentDidMount(){
        this.requestLastActiveDiscussions();
    }


    shouldComponentUpdate(nextProps){
        if(nextProps.discussionsOverview && nextProps.discussionsOverview !== this.props.discussionsOverview){
            this.discsOverview = getOverview(nextProps.discussionsOverview);
            return true;
        }

        if(nextProps.discOpened !== this.discOpened){
            return true;
        }
        return false;
    }


    onSendMessage = (content, uploads) => {
        const { initSendMessage, openDiscId, discOpened, tempDisc } = this.props;
        const to = (discOpened.friend && discOpened.friend.id )
                || (tempDisc.recipient && tempDisc.recipient.id);
        
        const msg = {content, to, uploads};
        logger.info(msg);

        if(to){
            this.sock.emit("sendMessage", openDiscId, msg);
            initSendMessage();
            this.setState({sendMessageStatus: SENDING_MESSAGE});
        }
        else {
            this.setState({sendMessageStatus: SENDING_FAILURE});
        }
        
    }

    requestLastActiveDiscussions = () => {
        this.sock.emit("retrieveActiveDiscs");
    }


    markMessagesAsRead = () => {
        const { discOpened } = this.props
        this.sock.emit("markAsSeen", discOpened.id);
    }


    updateWritingMessage = (bool) => {
        this.setState({isWritingMessage: bool});
    }


    onContinueLeaveDiscussion = () => {
        const { discIdRequested } = this.state;

        this.openDiscussion(discIdRequested);

        this.setState({
            isWritingMessage:false,
            showLeaveDiscussionDialog: false,
            discIdRequested: -1
        })
    }


    onCancelLeaveDiscussion = () => {
        this.setState({
            showLeaveDiscussionDialog: false,
            discIdRequested: -1
        }) 
    }


    requestDiscussion = (id) => {
        const { isWritingMessage } = this.state;
        
        if(isWritingMessage){
            this.setState({
                showLeaveDiscussionDialog: true,
                discIdRequested: id
            });
        }

        else {
            this.openDiscussion(id);
        }
    }


    

    openDiscussion = (id) => {
        const { 
            openDiscId, 
            getDiscussion,
            changeOpenedDiscId,
            discussions
        } = this.props;



        if(openDiscId === id){
            logger.info("Discussion already open");
            return;
        }

        const discInCache = (discussions[id] !== undefined);
        if(!discInCache){
            logger.info("discussion not in cache, we fetch it");
            getDiscussion(id); 
        }

        
        changeOpenedDiscId(id);           
    }


    createNewDiscussion = () => {
        const { createTempDisc } = this.props;
        createTempDisc({
            id: `temp${Date.now()}`,
            messages: []
        })

        // We directly check with the server if the disc exists
        //this.sock.emit("createDiscussion", withFriend, "users");

    }

    closeNewDiscussion = () => {
        const { closeTempDisc } = this.props;        
        closeTempDisc();
        this.setState({isWritingMessage:false});
    }


    fetchMatchingFriends = (value, nbOfSuggestions) => {
        this.sock.emit("matchFriends", value, nbOfSuggestions);
    }

    setNewRecipient = (recipient) => {
        const {setRecipientToTemp} = this.props;
        setRecipientToTemp(recipient);
    }

    

    renderDiscussionList = () => {
        const { openDiscId, tempDisc } = this.props;

        return ( 
            <DiscussionList 
                openDiscId= {openDiscId}
                discsOverview={this.discsOverview} 
                listItemClick = {this.requestDiscussion}
                tempDisc={tempDisc}
                startDiscussion={this.createNewDiscussion}
                closeNewDiscussion= {this.closeNewDiscussion}   
            >

                <IconButton onClick={this.createNewDiscussion}>
                    <MessageIcon />
                </IconButton>


            </DiscussionList> 
        )
    }


    render() {
        const { 
            isDiscOpened, 
            openDiscId, 
            profile, 
            discOpened, 
            friendlist, 
            tempDisc 
        } = this.props;

        const { 
            showLeaveDiscussionDialog, 
            isWritingMessage,
            sendMessageStatus
        } = this.state;
        
        
        return (
            <div className="mainboard__wrapper">
                {this.renderDiscussionList()}

                <div className="discussion-content__wrapper">
                    {isDiscOpened 
                        ?   <DiscussionLayout 
                                disc={discOpened}
                                profile={profile} 
                                discId= {openDiscId}
                                onSendMessage={this.onSendMessage}
                                markMessagesAsRead= {this.markMessagesAsRead}
                                friendlist={friendlist}
                                fetchMatchingFriends= {this.fetchMatchingFriends}
                                suggestions = {tempDisc.suggestedRecipients || []}
                                setNewRecipient= { this.setNewRecipient}
                                isWritingMessage={isWritingMessage}
                                sendMessageStatus={sendMessageStatus}
                                updateWritingMessage={this.updateWritingMessage}
                            /> 
                        :   <WelcomeLayout 
                                profile={profile} 
                                friendlist= {friendlist}
                                startDiscussion={this.createNewDiscussion}   
                            />
                    }
                </div>

                { 
                    showLeaveDiscussionDialog && 
                    <ShowLeaveDiscussionDialog 
                        onAccept= {this.onContinueLeaveDiscussion}
                        onCancel= {this.onCancelLeaveDiscussion}
                    /> 
                }
            
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
            friendsProfilePicture: friends.profilepic,
            lastMessage:disc.lastMessage.content || "",
            unreadMessagesCount: disc.unreadMessagesCount
        }
    });
}

const refactorDiscussion = (disc, userprofile) => {
    // We refactor the disc received from server
    if(disc && disc.id >= 0 && userprofile.id){
        const { id, user1, user2, content } = disc;

        const [ user, friend ] = user1.id === userprofile.id 
                                ? [ user1, user2 ] 
                                : [ user2, user1 ];

       return {
            id,
            user,
            friend,
            messages: content,
        }
    }

    return {};
}


const mapStateToProps = (state, ownProps) => {
    const { openDiscId, discussionsOverview, tempDisc, discussions } = state;

    const discOpened = openDiscId >= 0
                    ? refactorDiscussion(discussions[openDiscId], ownProps.profile) 
                    : tempDisc;

    // Inclure la possibilité d'une discTemp
    // peut etre en faisant !== -1 plutot que > 0
    const isDiscOpened = parseInt(openDiscId, 10) !== -1;

    return {
        openDiscId,
        discussionsOverview,
        discOpened,
        isDiscOpened,
        tempDisc,
        discussions

    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        // discussions actions
        changeOpenedDiscId: (disc) => dispatch(change_disc_id(disc)),
        receiveUserDiscs: (discs) => dispatch(receive_user_discs(discs)),
        updateDiscussionsOverview: (discId, msg) => dispatch(update_discussions_overview(discId, msg)),
        getDiscussion: (discId) => dispatch(get_discussion(discId)),
        updateDiscussion: (discId, msg) => dispatch(update_discussion(discId, msg)),
        // messages actions
        initSendMessage : () => dispatch(send_message()),
        markDiscMessageAsRead: (discId) => dispatch(mark_as_read(discId)),
        // tempDisc actions
        setRecipientToTemp: (recipient) => dispatch(set_recipient_temp(recipient)),
        setPossibleRecipientsToTemp: (users) => dispatch(set_possible_recipients_temp(users)),
        createTempDisc: (tempDisc) => dispatch(create_temp_disc(tempDisc)),
        closeTempDisc: () => dispatch(close_temp_disc()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);