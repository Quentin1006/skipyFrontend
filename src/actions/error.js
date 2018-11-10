export const ERR_ASYNC_REQUEST = "ERR_ASYNC_REQUEST";
export const err_async_request = (error) => {
    return {
        type: ERR_ASYNC_REQUEST,
        error
    }
}

export const UNAUTHORIZED_ASYNC_REQUEST = "UNAUTHORIZED_ASYNC_REQUEST";
export const unauthorized_async_request = (error) => {
    return {
        type: UNAUTHORIZED_ASYNC_REQUEST,
        error
    }
}

/**
 * FORMAT D'UNE ERROR
 * code
 * type
 * message
 */

export const ERROR = "ERROR";
export const error = ({type, code, message}) => {
    return (dispatch) => {
        dispatch({
            type,
            code,
            message
        })
    }

}