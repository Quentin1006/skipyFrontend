import { 
    ERR_ASYNC_REQUEST,
    UNAUTHORIZED_ASYNC_REQUEST
} from "../actions/error";

export default (state={}, action) => {
    const {type, error} = action;
    switch(type){
        case ERR_ASYNC_REQUEST:
            console.log(error);
            return state;

        case UNAUTHORIZED_ASYNC_REQUEST:
            console.log(error);
            return state;

        default:
            return state;
    }
}