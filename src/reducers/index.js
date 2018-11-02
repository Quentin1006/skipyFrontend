import { combineReducers } from "redux";

import userprofile from "./userprofile";
import error from "./error";
import app from "./application";
import {
    discussions,
    discOpened,
    openDiscId
} from "./discussions";


const rootReducer = combineReducers({
    userprofile,
    discussions,
    openDiscId,
    discOpened,
    error,
    app
})

export default rootReducer;