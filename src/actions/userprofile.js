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
    const body = {access_token, auth_provider, auth_type};

    return asyncRequest({
        url,
        startAction: send_access_token,
        startActionParams: params,
        endAction: receive_user_profile,
        method: "post",
        body
    })
}

