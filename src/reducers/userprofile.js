import {
    SEND_ACCESS_TOKEN,
    RECEIVE_USER_PROFILE,
    SEND_CONNECTION_REQUEST,
    RECEIVE_CONNECTION_RESPONSE,
    REQUEST_USERFRIENDS,
    RECEIVE_USERFRIENDS_RESPONSE,
    LOGOUT,
    SEND_UPDATE_USER,
    RECEIVE_UPDATED_USER
} from "../actions/userprofile";



export default (state={}, action) => {
    let isLoggedIn = false;
    let profile = {};
    switch(action.type){
        case SEND_ACCESS_TOKEN:
            return state;
        
        case RECEIVE_USER_PROFILE:
            profile = action.userprofile || {};
            // si userprofile est non vide, il aura tjs un id
            isLoggedIn = !!profile.id;
            state = {
                ...state,
                isLoggedIn
            }

            if(profile.error){
                return {
                    ...state,
                    isLoggedIn,
                }
            }
            else {
                return {
                    ...state,
                    isLoggedIn,
                    profile
                }
                
            }
        

        case SEND_CONNECTION_REQUEST:
            return state;
        
        case RECEIVE_CONNECTION_RESPONSE:
            isLoggedIn = action.user.isLoggedIn;
            profile = action.user.profile;

            return {
                ...state,
                isLoggedIn,
                profile
            }
        
        case REQUEST_USERFRIENDS:
            return {
                ...state,
                requestingUserFriends: true
            }

        case RECEIVE_USERFRIENDS_RESPONSE:
            return {
                ...state,
                friendlist: action.friends,
                requestingUserFriends: true
            }
        
        case SEND_UPDATE_USER: 
            return {
                ...state,
                updatingUser: true,
            }
        
        case RECEIVE_UPDATED_USER:
            profile = action.user;
            return {
                ...state,
                profile,
                updatingUser: false,
            }

        
        case LOGOUT:
            profile = action.user;
            isLoggedIn = !(profile.id === undefined);
            return {
                ...state,
                profile,
                isLoggedIn
            }

        default:
            return state;
    }
}