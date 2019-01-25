import {
    REQUEST_DISCUSSION,
    RECEIVE_DISCUSSION,
    REQUEST_USER_DISCUSSIONS,
    RECEIVE_USER_DISCUSSIONS,
    GET_DISCUSSION_FROM_CACHE,
    SEND_MESSAGE,
    UPDATE_DISCUSSION,
    UPDATE_DISCUSSIONS_OVERVIEW,
    MARK_AS_READ,
    CHANGE_DISC_ID,
    CREATE_TEMP_DISC,
    SET_RECIPIENT_TEMP,
    SET_POSSIBLE_RECIPIENTS_TEMP,
    CLOSE_TEMP_DISC


} from "../actions/discussions";

import { deepCopy, setElementUpFront } from "../utils";

import ImmutableCache from "../lib/ImmutableCache";

const MAX_CACHED_DISCS = 10;
const cache = new ImmutableCache(MAX_CACHED_DISCS);




export const openDiscId = (state=-1, action) => {
    switch(action.type){
        case GET_DISCUSSION_FROM_CACHE:
            return action.disc.id;
        
        case CHANGE_DISC_ID:
            return action.discId;

        
        default:
            return state
    } 
}

export const tempDisc = (state={}, action) => {
    switch(action.type){
        case CREATE_TEMP_DISC:
            return action.tempDisc;
        
        case SET_RECIPIENT_TEMP:
            return {
                ...state,
                recipient: action.recipient
            }
        
        case SET_POSSIBLE_RECIPIENTS_TEMP:
            return {
                ...state,
                suggestedRecipients: action.suggested_recipients
            }
        
        case CLOSE_TEMP_DISC:
            return {};
        
        default:
            return state;
    }
}



// discussionsOverview would be more exact
export const discussionsOverview = (state=[], action) => {
    const newState = deepCopy(state);

    switch(action.type){
        case REQUEST_USER_DISCUSSIONS:
            console.log("user discs has been requested");
            return state;
        
        case RECEIVE_USER_DISCUSSIONS:
            console.log("user discs has been received");
            const discussions = action.discs;
            return discussions;

        
        case UPDATE_DISCUSSIONS_OVERVIEW:
            
            const done = setElementUpFront(newState, action.discId);
            // si nouvelle conversation
            if(!done){
                // newState.unshift(action.disc);
            }
            newState[0].lastMessage = action.msg;

            // If the message is not from you
            if(action.msg.from === newState[0].with.id){
                newState[0].unreadMessagesCount++;
            }
            

            return newState;


        case MARK_AS_READ:
            const discId = action.discId;

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

export const recentlyOpenedDiscussions = (state=cache, action) => {
    switch(action.type){
        case RECEIVE_DISCUSSION:
            state.add(action.disc)
            return state;

        default:
            return state
    } 
}


export const discussions = (state={}, action) => {

    switch(action.type){

        case SEND_MESSAGE:
            return state;

        case UPDATE_DISCUSSION:
            const id = action.discId;
            const discExists = state[id];

            if(discExists){
                const currentContent =  discExists.content;
                return {
                    ...state,
                    [id]: {
                        ...state[id],
                        content : [
                            ...currentContent,
                            action.msg
                        ] 
                    }
                }

            }

            return state;
        

        case REQUEST_DISCUSSION:
            return state;
            

        case RECEIVE_DISCUSSION:
            return {
                ...state,
                [action.disc.id]: action.disc
            }
            
        
        case MARK_AS_READ:
            const disc = state[action.discId] || {};
            
            const { content=[] } = disc;
            
            for(const msg of content){
                // message is addressed to user
                if(msg.to === action.userId){
                    if(msg.state === "seen")
                        break;
                    
                    msg.state = "seen";
                }
            }
           
            return {
                ...state,
                [action.discId] : {
                    ...state[action.discId],
                    content
                }
            }

        default:
            return state;
    }
}

