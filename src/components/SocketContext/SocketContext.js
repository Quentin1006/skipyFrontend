import React from "react";
import io from "socket.io-client";

import server from "../../config/server";

import { 
    addNotif,
    updateSearchOnFriendshipChange
} from "./helper"


const SocketContext = React.createContext();


class SocketProvider extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            search: {
                sock: null,
                matches: [],
                search: this.searchUsers
            },
            friendship: {
                sock: null,
                sendFriendRequest: this.sendFriendRequest,
                answerFriendRequest: this.answerFriendRequest,
                cancelFriendRequest: this.cancelFriendRequest
            },
            notifications : {
                sock: null,
                list: []
            }

        }
    }

    componentDidMount(){
        const searchSocket = io.connect(`${server.url}/search`);
        const fshipSocket = io.connect(`${server.url}/friendship`);

        fshipSocket.on("connFriendship", (id) => {console.log("connected to fship socket with id: "+id)})

        fshipSocket.on("receive friend request", this.onReceiveFriendRequest);
        fshipSocket.on("send friend request response", this.onSendFriendRequest);
        fshipSocket.on("answer friend request response", this.onAnswerFriendRequest);
        fshipSocket.on("answered friend request response", this.onAnsweredFriendRequest);
        fshipSocket.on("cancel friend request response", this.onCancelRequest);
        fshipSocket.on("canceled friend request response", this.onCanceledRequest);
        searchSocket.on("global search response", this.onGlobalSearch);

        this.setState(state => ({
            ...state,
            search: {
                ...state.search,
                sock: searchSocket
            },
            friendship: {
                ...state.friendship,
                sock: fshipSocket
            }    
        }));        
    }


    render(){
        const { children } = this.props;
        const context = this.state;

        return (
            <SocketContext.Provider value={context}>
                {children}
            </SocketContext.Provider>
        )
    }

    //////////////////////
    // EXPORTED METHODS //
    //////////////////////

    searchUsers = (text) => {
        const { search } = this.state;
        search.sock.emit("global search", text);
    }


    sendFriendRequest = (idReceiver) => {
        const { friendship } = this.state;
        friendship.sock.emit("send friend request", idReceiver);
    }
    

    answerFriendRequest = (fromId, accepted) => {
        const { friendship } = this.state;
        friendship.sock.emit("answer friend request", fromId, accepted);
    }


    cancelFriendRequest = (persId) => {
        const { friendship } = this.state;
        friendship.sock.emit("cancel friend request", persId);
    }

    //////////////////////
    //    LISTENERS     //
    //////////////////////

    onAnsweredFriendRequest = ({err, res}) => {
        if(err) return;
        
        const { id } = res.friendship;
        const answerWord = res.accepted ? "accepted": "declined";
        const content = `Your friend request has been ${answerWord} by ${res.receiverId}`;
        const type = "FR_ANSWERED";

        this.setState(addNotif({
            id,
            date: Date.now(),
            type,
            content
        }));

        const { receiverId, friendship } = res;
        this.setState(updateSearchOnFriendshipChange(receiverId, friendship)); 
    }


    onAnswerFriendRequest = ({err, res}) => {
        if(err) return;

        const { id } = res.friendship;
        const answerWord = res.accepted ? "accepted": "declined";
        const content = `You ${answerWord} the friend request from ${res.senderId}`;
        const type = "FR_ANSWER";

        this.setState(addNotif({
            id,
            date: Date.now(),
            type,
            content
        }));

        const { senderId, friendship } = res;
        this.setState(updateSearchOnFriendshipChange(senderId, friendship));
    }


    onReceiveFriendRequest = ({err, res}) => {
        
        if(err) return;
        const { id, initBy } = res;
        const content = `You received a friend request from ${initBy}`;
        const type = "FR_RECEIVE";

        this.setState(addNotif({
            id,
            date: Date.now(),
            type,
            content
        }));

        const { senderId, friendship } = res;
        this.setState(updateSearchOnFriendshipChange(senderId, friendship)); 
    }

    onSendFriendRequest = ({err, res}) => {
        if(err) return;
        const { receiverId, friendship } = res;
        const { id, initBy } = friendship;
        const content = `Friend request sent to ${initBy}`;
        const type = "FR_SEND";

        this.setState(addNotif({
            id,
            date: Date.now(),
            type,
            content
        }));

       
        this.setState(updateSearchOnFriendshipChange(receiverId, friendship));

    }


    onCancelRequest = ({err, res}) => {
        if(err) return;

        const { userDeleted, friendship } = res;
        this.setState(updateSearchOnFriendshipChange(userDeleted, friendship));

    }


    onCanceledRequest = ({err, res}) => {
        if(err) return;

        const { userDeleting, friendship } = res;
        this.setState(updateSearchOnFriendshipChange(userDeleting, friendship));

    }


    onGlobalSearch = (matches, fshipStatuses) => {  
        matches = matches.map(pers => ({
            ...pers,
            fshipStatus: fshipStatuses[pers.id]
        }))
        this.setState(state => ({
            ...state,
            search: {
                ...state.search,
                matches
            }    
        }))
    }
}


const withSocketConsumer = (
    // Add all sockets by default
    sockets=["friendship", "search", "notifications"]
) => ComponentToWrap => {
    class C extends React.Component {
        render(){
            return (
                <SocketContext.Consumer>
                    {contextProps => {
                        const socketProps = sockets.reduce((acc, socket) => ({ 
                            ...acc,
                            ...contextProps[socket]
                        }), {});

                        return (
                            <ComponentToWrap 
                                {...socketProps}
                                {...this.props}
                            />
                        ) 
                    }}
                </SocketContext.Consumer>
            )
        }
    }
    return C;
};

export { SocketProvider, withSocketConsumer };