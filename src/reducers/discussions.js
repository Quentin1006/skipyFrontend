import {
    REQUEST_DISCUSSION,
    RECEIVE_DISCUSSION,
    REQUEST_USER_DISCUSSIONS,
    RECEIVE_USER_DISCUSSIONS
} from "../actions/discussions";


export const openDiscId = (state=-1, action) => {
    switch(action.type){
        case RECEIVE_DISCUSSION:
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