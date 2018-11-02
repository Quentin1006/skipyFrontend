import { asyncRequest } from "./helper";
import server from "../config/server";


export const SEND_ACCESS_TOKEN = "SEND_ACCESS_TOKEN";
const send_access_token = (access_token, auth_provider, auth_type) => {
    return {
        type: SEND_ACCESS_TOKEN,
        auth_provider,
        auth_type,
        access_token
    }
} 

export const RECEIVE_USER_PROFILE = "RECEIVE_USER_PROFILE";
const receive_user_profile = (userprofile) => {

    return {
        type: RECEIVE_USER_PROFILE,
        userprofile
    }
} 

export const login_user = (access_token, auth_provider, auth_type) => {
    const params = [access_token, auth_provider, auth_type];
    const url = `${server.url}/login`;
    const body = {token_or_code: access_token, auth_provider, auth_type};

    return asyncRequest({
        url,
        startAction: send_access_token,
        startActionParams: params,
        endAction: receive_user_profile,
        method: "post",
        body
    })
}


export const SEND_CONNECTION_REQUEST = "SEND_CONNECTION_REQUEST";
const send_connection_request = () => {
    return {
        type: SEND_CONNECTION_REQUEST
    }
}

export const RECEIVE_CONNECTION_RESPONSE = "RECEIVE_CONNECTION_RESPONSE";
const receive_connection_response = (user) => {
    return {
        type: RECEIVE_CONNECTION_RESPONSE,
        user
    }
}


export const checkIfUserIsConnected = () => {
    const url = `${server.url}/login`;
    return asyncRequest({
        url,
        startAction: send_connection_request,
        endAction: receive_connection_response,
    })
}


export const SEND_USERFRIENDS_REQUEST = "SEND_USERFRIENDS_REQUEST";
const send_userfriends_request = (userId) => {
    return {
        type: SEND_USERFRIENDS_REQUEST,
        userId
    }
}

export const RECEIVE_USERFRIENDS_RESPONSE = "RECEIVE_USERFRIENDS_RESPONSE";
const receive_userfriends_response = (friends) => {
    return {
        type: RECEIVE_USERFRIENDS_RESPONSE,
        friends
    }
}


export const getUserFriends = (userId) => {
    const url = `${server.url}/users/${userId}/friends`;
    return asyncRequest({
        url,
        startAction: send_userfriends_request,
        startActionParams: [userId],
        endAction: receive_userfriends_response
    })
}
