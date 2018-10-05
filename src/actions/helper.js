import fetch from "cross-fetch";


// L'action de départ doit etre envoyé sous forme d'objet
export const asyncRequest = (url, startAction, endAction, err) => {
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