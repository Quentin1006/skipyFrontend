import { asyncRequest } from "./helper";
import server from "../config/server";




export const CHANGE_DISC_ID = "CHANGE_DISC_ID";
export const change_disc_id = (discId) => {
    return {
        type: CHANGE_DISC_ID,
        discId
    }
}

/**
 * TEMP DISC ACTIONS
 * 
 */


export const SET_RECIPIENT_TEMP = "SET_RECIPIENT_TEMP";
export const set_recipient_temp = (recipient) => {
    return {
        type: SET_RECIPIENT_TEMP,
        recipient
    }
}


export const SET_POSSIBLE_RECIPIENTS_TEMP = "SET_POSSIBLE_RECIPIENTS_TEMP";
export const set_possible_recipients_temp = (suggested_recipients) => {
    return {
        type: SET_POSSIBLE_RECIPIENTS_TEMP,
        suggested_recipients
    }
}


export const CREATE_TEMP_DISC = "CREATE_TEMP_DISC";
export const create_temp_disc = (tempDisc) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_TEMP_DISC,
            tempDisc
        });
        dispatch(change_disc_id(tempDisc.id));
    }
}


export const EMPTY_TEMP_DISC = "EMPTY_TEMP_DISC";
export const empty_temp_disc = () => {
    return {
        type: EMPTY_TEMP_DISC
    }
}


/**
 * UNREAD MESSAGES ACTIONS
 * 
 * 
 */


export const MARK_AS_READ = "MARK_AS_READ";
export const mark_as_read = (openedDisc) => {
    return {
        type: MARK_AS_READ,
        openedDisc
    }
}


/**
 * 
 * 
 * REQUEST ALL ACTIVE DISCUSSIONS OF USER
 * 
 * 
 */

export const REQUEST_USER_DISCUSSIONS = "REQUEST_USER_DISCUSSIONS";
const request_user_discs = (userId) => {
    return {
        type: REQUEST_USER_DISCUSSIONS,
        userId
    }
}
export const RECEIVE_USER_DISCUSSIONS = "RECEIVE_USER_DISCUSSIONS";
export const receive_user_discs = (discs) => {
    return {
        type: RECEIVE_USER_DISCUSSIONS,
        discs
    }
}


export const get_user_discussions = (userId) => {
    const url = `${server.url}/users/${userId}/activeDiscussions`
    return asyncRequest({
        url, 
        startAction: request_user_discs, 
        startActionParams: userId,
        endAction: receive_user_discs
    });
}


// export const RETRIEVE_USER_DISCUSSIONS = "RETRIEVE_USER_DISCUSSIONS";
// export const retrieveUserDiscussions = (discs) => {
//     return {
//         type: RETRIEVE_USER_DISCUSSIONS
//     }
// }


/**
 * 
 * 
 * REQUEST A DISCUSSION
 * 
 * 
 */


export const REQUEST_DISCUSSION = "REQUEST_DISCUSSION";
const request_disc = (discId) => {
    return {
        type: REQUEST_DISCUSSION,
        discId
    }
}

export const RECEIVE_DISCUSSION = "RECEIVE_DISCUSSION";
const receive_disc = (disc) => {
    return {
        type: RECEIVE_DISCUSSION,
        disc
    }
}


export const get_discussion = (discId) => {
    const url = `${server.url}/discussions/${discId}`
    return asyncRequest({
        url, 
        startAction: request_disc,
        startActionParams: discId, 
        endAction: receive_disc
    })
}


export const GET_DISCUSSION_FROM_CACHE = "GET_DISCUSSION_FROM_CACHE";
export const get_discussion_from_cache = (disc) => {
    return {
        type: GET_DISCUSSION_FROM_CACHE,
        disc
    }
}



/**
 * 
 * 
 * SEND A MESSAGE TO A CONTACT
 * 
 * 
 */


export const SEND_MESSAGE = "SEND_MESSAGE";
export const send_message = () => {
    return {
        type: SEND_MESSAGE,
    }
}


/**
 * 
 * Whether u were the sender or the receiver u'll go thru that event
 */
export const RECEIVE_MESSAGE_FROM_SERVER = "RECEIVE_MESSAGE_FROM_SERVER";
export const receive_message_from_server = (msg, discId) => {
    return {
        type: RECEIVE_MESSAGE_FROM_SERVER,
        msg,
        discId
    }
}