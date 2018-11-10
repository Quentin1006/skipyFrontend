import {
    REQUEST_DISCUSSION,
    RECEIVE_DISCUSSION,
    REQUEST_USER_DISCUSSIONS,
    RECEIVE_USER_DISCUSSIONS,
    GET_DISCUSSION_FROM_CACHE,
    SEND_MESSAGE,
    RECEIVE_MESSAGE_FROM_SERVER,
    MARK_AS_READ


} from "../actions/discussions";

import { deepCopy, setElementUpFront } from "../utils";

import ImmutableCache from "../lib/ImmutableCache";

const MAX_CACHED_DISCS = 10;
const cache = new ImmutableCache(MAX_CACHED_DISCS);

export const recentlyOpenedDiscussions = (state=cache, action) => {
    switch(action.type){
        case RECEIVE_DISCUSSION:
            state.add(action.disc)
            return state;

        default:
            return state
    } 
}


export const openDiscId = (state=-1, action) => {
    switch(action.type){
        case RECEIVE_DISCUSSION:
        case GET_DISCUSSION_FROM_CACHE:
            return action.disc.id || -1; 

        default:
            return state
    } 
}


export const discOpened = (state={}, action) => {
    switch(action.type){
        case REQUEST_DISCUSSION:
            return state;
        
        case RECEIVE_DISCUSSION:
        case GET_DISCUSSION_FROM_CACHE:
            return action.disc; 


        case SEND_MESSAGE:
            return state

        
        case MARK_AS_READ:
            const content = state.content.map(mess => {
                return {
                    ...mess,
                    state:2
                }
            })
            
            return {
                ...state,
                content
            }
        
        
        case RECEIVE_MESSAGE_FROM_SERVER:
            const isDiscussionOpened = () => (state.id && state.id === action.discId); 
            // add the message to the content
            if(action.msg && isDiscussionOpened()){
                const newState = {
                    ...state,
                    content: [
                        ...state.content,
                        action.msg
                    ]
                }
                return newState;
            }
            return state;

        default:
            return state
    } 
}

// discussionsOverview would be more exact
export const discussions = (state=[], action) => {
    const newState = deepCopy(state);

    switch(action.type){
        case REQUEST_USER_DISCUSSIONS:
            console.log("user discs has been requested");
            return state;
        
        case RECEIVE_USER_DISCUSSIONS:
            console.log("user discs has been received");
            const discussions = action.discs;
            return discussions;

        
        case RECEIVE_MESSAGE_FROM_SERVER:
            
            setElementUpFront(newState, action.discId);
            newState[0].lastMessage = action.msg;

            // If the message is not from you
            if(action.msg.from === newState[0].with.id){
                newState[0].unreadMessagesCount++;
            }
            

            return newState;


        case MARK_AS_READ:
            const discId = action.openedDisc;

            for(let disc of newState){
                if(disc.id === discId){
                    disc.unreadMessagesCount = 0;
                    break;
                }
            }

            return newState

        default:
            return state;
    }
}

