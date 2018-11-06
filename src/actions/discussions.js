import { asyncRequest } from "./helper";
import server from "../config/server";


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
const receive_user_discs = (discs) => {
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



/**
 * 
 * 
 * SEND A MESSAGE TO A CONTACT
 * 
 * 
 */


export const START_SEND_MESSAGE = "START_SEND_MESSAGE";
export const start_send_message = () => {
    return {
        type: START_SEND_MESSAGE,
    }
}

export const CONFIRMATION_SEND_MESSAGE = "CONFIRMATION_SEND_MESSAGE";
export const confirmation_send_message = (msg, discId) => {
    return {
        type: CONFIRMATION_SEND_MESSAGE,
        msg,
        discId
    }
}


// export const send_message = (msg, to, discId) => {
//     const url = `${server.url}/discussions/${discId}`
//     return asyncRequest({
//         url, 
//         startAction: start_send_message,
//         startActionParams: [msg, to], 
//         endAction: confirmation_send_message,
//         body: {msg, to},
//         method:"post"
//     })
// }
