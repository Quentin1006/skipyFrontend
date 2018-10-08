import {
    SEND_ACCESS_TOKEN,
    RECEIVE_USER_PROFILE
} from "../actions/userprofile";

export default (state={}, action) => {
    switch(action.type){
        case SEND_ACCESS_TOKEN:
            return state;
        
        case RECEIVE_USER_PROFILE:
            const profile = action.userprofile || {};
            // si userprofile est non vide, il aura tjs un id
            const isLoggedIn = !!profile.id
        
            return {
                ...state,
                isLoggedIn,
                profile
            }

        default:
            return state;
    }
}