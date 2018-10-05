import { combineReducers } from "redux";

import userprofile from "./userprofile";
import discussions from "./discussions";

const rootReducer = combineReducers({
    userprofile,
    discussions
})

export default rootReducer;