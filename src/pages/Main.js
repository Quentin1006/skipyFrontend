import React, { Component } from 'react';


import { connect } from "react-redux";
import { withCookies } from 'react-cookie';

import Logger from "../lib/Logger";

import './Main.css';

import Login from "../components/Login";
import MainBoard from "../components/MainBoard";


import { 
    get_user_discussions,
    get_discussion,
    get_discussion_from_cache
} from "../actions/discussions";


import { 
    getUserFriends,
    checkIfUserIsConnected 
} from "../actions/userprofile";


const logger = new Logger("Main");


// const testDiscussions= [
//     {
//         friendsProfilepic: "entete-carre-magenta.png",
//         friendsName:"Liam Neeson",
//         lastMessage:"Long time no see pal! But i need to add some text to really see how it fits, eventhough its getting quite, i think we haven't met the limit. Now it should be good"
//     },
//     {
//         friendsProfilepic: "entete-carre-magenta.png",
//         friendsName:"Coco Nuts",
//         lastMessage:"Just a short text"
//     }
// ]



class Main extends Component {
    constructor(props){
        super(props);
        const { dispatch } = this.props;
        dispatch(checkIfUserIsConnected());

        this.openDiscussion = this.openDiscussion.bind(this);
    }

    componentDidMount(){
        const { dispatch, isLoggedIn, profile } = this.props;

        if(isLoggedIn && profile){
            dispatch(get_user_discussions(profile.id));
            dispatch(getUserFriends(profile.id));
        }
       
    }

    componentDidUpdate(prevProps){
        const { isLoggedIn, dispatch, profile } = this.props;
        if(isLoggedIn && prevProps.isLoggedIn !== isLoggedIn && profile){
            dispatch(get_user_discussions(profile.id));
            dispatch(getUserFriends(profile.id));
        }
    }

    openDiscussion(id){
        const { dispatch, openDiscId, recentlyOpenedDiscussions } = this.props;

        if(openDiscId === id){
            logger.info("Discussion already open");
            return;
        }

        const discInCache = recentlyOpenedDiscussions.find(id);
        if(discInCache){
            logger.info("discussion is in cache");
            dispatch(get_discussion_from_cache(discInCache));
            return;
        }

        dispatch(get_discussion(id));
            
    }

    render(){
        const {
            discussions, 
            isLoggedIn, 
            isDiscOpened, 
            profile, 
            discOpened
        } = this.props;
        
        return (
            <div className="main__wrapper">
                {
                    isLoggedIn 
                    ? <MainBoard 
                        discussions={discussions} 
                        isDiscOpened={isDiscOpened}
                        discOpened={discOpened}
                        profile={profile}
                        listItemClick={this.openDiscussion}
                      />
                    : <Login cookies={this.props.cookies}/>
                }
            </div>
        );
    }
}

const refactorDiscussion = (disc, userprofile) => {
    // We refactor the disc received from server
    if(disc.id && userprofile.id){
        const { id, user1, user2, content } = disc;

        const [ user, friend ] = user1.id === userprofile.id 
                                ? [ user1, user2 ] 
                                : [ user2, user1 ];

       return {
            id,
            user,
            friend,
            messages: content
        }
    }

    return {};
}


const mapStateToProps = (state) => {
    const { discussions } = state;

    const openDiscId = state.openDiscId;
    const { recentlyOpenedDiscussions } = state;
    const isDiscOpened = parseInt(openDiscId, 10) > 0;
    const isLoggedIn = state.userprofile.isLoggedIn;
    const profile = state.userprofile.profile || {};

    const discOpened = refactorDiscussion(state.discOpened, profile);

    return {
        discussions,
        isDiscOpened,
        openDiscId,
        isLoggedIn,
        recentlyOpenedDiscussions,
        profile,
        discOpened
    }
}

export default withCookies(connect(mapStateToProps)(Main));