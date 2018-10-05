export default (state={}, action) => {
    let newState;
    switch(action.type){
        case "LOGIN_USER":

            break;
        
        case "GET_USER_INFO":
            
            break;

        default:
            newState = state;
            break;
    }
    console.log("newState=", newState);
    return newState;
}