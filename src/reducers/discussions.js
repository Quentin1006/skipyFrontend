import {
    REQUEST_DISCUSSION,
    RECEIVE_DISCUSSION,
    REQUEST_USER_DISCUSSIONS,
    RECEIVE_USER_DISCUSSIONS


} from "../actions/discussions"

export default (state=[], action) => {

    switch(action.type){
        case REQUEST_USER_DISCUSSIONS:
            console.log("user discs has been requested");
            return state;
        
        case RECEIVE_USER_DISCUSSIONS:
            console.log("user discs has been received");
            const discussions = action.discs;
            return discussions;

        case  REQUEST_DISCUSSION:
            console.log("disc has been requested");
            return state;
        
        case RECEIVE_DISCUSSION:
            console.log("received the discussion");
            console.log(action.disc);
            return state;

        default:
            return state;
    }
}