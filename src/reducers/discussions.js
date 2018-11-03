import {
    REQUEST_DISCUSSION,
    RECEIVE_DISCUSSION,
    REQUEST_USER_DISCUSSIONS,
    RECEIVE_USER_DISCUSSIONS,
    GET_DISCUSSION_FROM_CACHE
} from "../actions/discussions";

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

        default:
            return state
    } 
}


export const discussions = (state=[], action) => {

    switch(action.type){
        case REQUEST_USER_DISCUSSIONS:
            console.log("user discs has been requested");
            return state;
        
        case RECEIVE_USER_DISCUSSIONS:
            console.log("user discs has been received");
            const discussions = action.discs;
            return discussions;


        default:
            return state;
    }
}