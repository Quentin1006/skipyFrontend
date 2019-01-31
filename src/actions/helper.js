import fetch from "cross-fetch";
import { 
    error,
    ERR_ASYNC_REQUEST,
    UNAUTHORIZED_ASYNC_REQUEST
} from "./error";
import objectToFormData from 'object-to-formdata';




export const asyncRequest = ({
    url, 
    method='get',
    body={},
    headers={},
    startAction, 
    startActionParams =[], 
    endAction, 
    errAction = error, 
    includeCookies=true
    
}) => {

    let fetchOpts = {method, headers};
    if(includeCookies)
        fetchOpts.credentials = 'include';

    if(!Array.isArray(startActionParams))
        startActionParams = [startActionParams];

    return (dispatch) => {
        dispatch(startAction(...startActionParams));

        if(method.toLowerCase() === 'post'){
            fetchOpts.body = objectToFormData(body);
            //fetchOpts.body = serializeParams(body);
            fetchOpts.headers['Accept'] = 'application/json, text/plain, application/x-www-form-urlencoded, multipart/form-data';
            //fetchOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        
        fetch(url, fetchOpts)
            .then(
                resp => { 
                    const { status } = resp;
                    switch(status){
                        case 401:
                            return {
                                type: UNAUTHORIZED_ASYNC_REQUEST,
                                code: status,
                                message: "Unauthorized",
                                error: true
                            }
                        
                        case 404: 
                            return {
                                type: UNAUTHORIZED_ASYNC_REQUEST,
                                code: status,
                                message: "Not Found",
                                error: true
                            }   
                        
                        case 500:
                            return {
                                type: UNAUTHORIZED_ASYNC_REQUEST,
                                code: status,
                                message: "Internal Server Error",
                                error: true
                            }

                        default:
                            return resp.json();
                    } 
                }      
            )
            .catch(error => ({
                type: ERR_ASYNC_REQUEST,
                code: 400,
                message: error.message,
                error: true

            }))
            // This way if the server returns an error, 
            // but expected (no disfunction) we redirect toward the error action
            // Maybe it shouldnt be part of the this function and should be established individually
            // for each response to ba able to manage the error specifically
            .then(resp => dispatch(resp.error ? errAction(resp) : endAction(resp)))
    }
}


const serializeParams = (params) => { 
    return params 
        ? Object.keys(params).map((key) => (
            [key, params[key]].map(encodeURIComponent).join("=")
        )).join("&") 
        : '' 
}

const buildBody = (params) => {
    const formData = new FormData()
    Object.keys(params).map((key) => {
        formData.append(key, params[key]);
    });

    return formData;
        
}