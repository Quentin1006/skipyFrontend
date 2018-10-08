import fetch from "cross-fetch";
import { err_async_request } from "./error";


export const asyncRequest = ({
    url, 
    method='get',
    body={},
    headers={},
    startAction, 
    startActionParams =[], 
    endAction, 
    err, 
    includeCookies=true
}) => {
    let fetchOpts = {method, headers};
    if(includeCookies)
        fetchOpts.credentials = 'include';

    if(!Array.isArray(startActionParams))
        startActionParams = [startActionParams];

    return (dispatch) => {
        if(!err) 
            err = (error) => err_async_request(error);

        dispatch(startAction(...startActionParams));

        if(method === 'post'){
            fetchOpts.body = serializeParams(body);
            fetchOpts.headers = {
                'Accept': 'application/json, text/plain, application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return fetch(url, fetchOpts)
            .then(
                resp => { 
                    const { status } = resp;
                    switch(status){
                        case 401:
                            throw(resp.statusText);
                        default:
                            return resp.json();
                    }
                },
                error => dispatch(err(error))
            )
            .then(
                resp => dispatch(endAction(resp)),
                error => dispatch(err(error))
            )

    }
}


// L'action de départ doit etre envoyé sous forme d'objet
export const asyncRequestOld = (url, startAction, endAction, err) => {
    if(!err) 
        err = (error) => console.log(error);

    return (dispatch) => {
        dispatch(startAction)
        return fetch(url)
            .then(
                resp => resp.json(),
                error => console.log(error)
            )
            .then((resp) => {
                    dispatch(endAction(resp))
                }
            )

    }
}



const serializeParams = (params) => { 
    return params 
        ? Object.keys(params).map((key) => (
            [key, params[key]].map(encodeURIComponent).join("=")
        )).join("&") 
        : '' 
}