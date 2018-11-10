import fetch from "cross-fetch";
import { error } from "./error";


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
            fetchOpts.body = serializeParams(body);
            fetchOpts.headers['Accept'] = 'application/json, text/plain, application/x-www-form-urlencoded';
            fetchOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        
        fetch(url, fetchOpts)
            .then(
                resp => { 
                    const { status } = resp;
                    switch(status){
                        case 401:
                            return(`${resp.statusText}, Unauthorized`);
                        default:
                            return resp.json();
                    } 
                }      
            )
            .catch(error => error.message)
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