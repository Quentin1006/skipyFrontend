import { combineReducers } from "redux";

import userprofile from "./userprofile";
import discussions from "./discussions";
import error from "./error";
import app from "./application";

const rootReducer = combineReducers({
    userprofile,
    discussions,
    error,
    app
})

export default rootReducer;