import { 
    ERR_ASYNC_REQUEST,
    UNAUTHORIZED_ASYNC_REQUEST
} from "../actions/error";



export default (state={}, action) => {
    const {type, code, message} = action;
    switch(type){
        case ERR_ASYNC_REQUEST:
        case UNAUTHORIZED_ASYNC_REQUEST:
            return {
                code,
                message
            };

        default:
            return state;
    }
}