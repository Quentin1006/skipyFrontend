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


export const LOGOUT_INIT = "LOGOUT_INIT";
const logout_init = () => {
    return {
        type: LOGOUT_INIT
    }
}

export const LOGOUT = "LOGOUT";
const logout_resp = (user) => {
    return {
        type: LOGOUT,
        user
    }
}

export const logout = () => {
    const url = `${server.url}/login/logout`;

    return asyncRequest({
        url,
        startAction: logout_init,
        endAction: logout_resp,
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


export const REQUEST_USERFRIENDS = "REQUEST_USERFRIENDS";
const request_userfriends = () => {
    return {
        type: REQUEST_USERFRIENDS,
    }
}

export const RECEIVE_USERFRIENDS_RESPONSE = "RECEIVE_USERFRIENDS_RESPONSE";
const receive_userfriends_response = (friends) => {
    return {
        type: RECEIVE_USERFRIENDS_RESPONSE,
        friends
    }
}


export const get_user_friends = () => {
    const url = `${server.url}/users/me/friends`;
    return asyncRequest({
        url,
        startAction: request_userfriends,
        endAction: receive_userfriends_response
    })
}


export const SEND_UPDATE_USER = "SEND_UPDATE_USER";
const send_update_user =  (fields) => ({
    type: SEND_UPDATE_USER,
    fields
});

export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER";
const receive_updated_user =  (user) => ({
    type: RECEIVE_UPDATED_USER,
    user
})

export const update_user = (fields) => {
    const url = `${server.url}/users/me/update`;
    const body = fields;

    return asyncRequest({
        url,
        startAction: send_update_user,
        params: fields,
        endAction: receive_updated_user,
        method: "post",
        body
    })
}

