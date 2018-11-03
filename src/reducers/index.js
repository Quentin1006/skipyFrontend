import { combineReducers } from "redux";

import userprofile from "./userprofile";
import error from "./error";
import app from "./application";
import {
    discussions,
    discOpened,
    openDiscId,
    recentlyOpenedDiscussions
} from "./discussions";


const rootReducer = combineReducers({
    userprofile,
    discussions,
    openDiscId,
    discOpened,
    recentlyOpenedDiscussions,
    error,
    app
})

export default rootReducer;