import { combineReducers } from "redux";

import userprofile from "./userprofile";
import lastError from "./error";
import app from "./application";
import {
    discussionsOverview,
    discussions,
    openDiscId,
    recentlyOpenedDiscussions,
    tempDisc
} from "./discussions";


const rootReducer = combineReducers({
    userprofile,
    discussionsOverview,
    discussions,
    openDiscId,
    recentlyOpenedDiscussions,
    tempDisc,
    lastError,
    app
})

export default rootReducer;