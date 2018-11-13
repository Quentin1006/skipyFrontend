import { combineReducers } from "redux";

import userprofile from "./userprofile";
import lastError from "./error";
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
    lastError,
    app
})

export default rootReducer;