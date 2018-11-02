import { asyncRequest } from "./helper";
import server from "../config/server";


// export const OPEN_DISCUSSION = "OPEN_DISCUSSION";
// export const open_discussion = (id) => {
//     return {
//         type: OPEN_DISCUSSION,
//         id
//     }
// }


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

