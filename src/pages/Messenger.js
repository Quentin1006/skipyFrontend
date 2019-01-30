import React, { Component } from 'react';


import { connect } from "react-redux";
import { withCookies } from 'react-cookie';

import Logger from "../lib/Logger";

import './Messenger.css';

import MainBoard from "../components/MainBoardContainer";

import { 
    checkIfUserIsConnected ,
    get_user_friends,
    logout
} from "../actions/userprofile";


const logger = new Logger("Main");
logger.info("beat")



class Main extends Component {
    constructor(props){
        super(props);
        const { checkIfUserIsConnected } = this.props;
        checkIfUserIsConnected();

        
    }

    componentDidMount(){
        const { isLoggedIn, profile, getUserFriends } = this.props;

        if(isLoggedIn && profile){
            getUserFriends();
        }
       
    }

    componentDidUpdate(prevProps){
        const { isLoggedIn, getUserFriends, profile } = this.props;
        if(isLoggedIn && prevProps.isLoggedIn !== isLoggedIn && profile){
            getUserFriends();
        }
    }

    

    render(){
        const {
            profile, 
            friendlist,
        } = this.props;
        
        return (
            <div className="mainboard__container">
            {
                <MainBoard 
                    profile={profile}
                    friendlist= {friendlist}
                />
                
            }
            </div>   
        );
    }
}




const mapStateToProps = (state) => {
    

    
    const { recentlyOpenedDiscussions } = state;
    
    const isLoggedIn = state.userprofile.isLoggedIn;
    const profile = state.userprofile.profile || {};
    const friendlist = state.userprofile.friendlist || [];

    

    return {
        isLoggedIn,
        recentlyOpenedDiscussions,
        profile,
        friendlist,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkIfUserIsConnected: () => dispatch(checkIfUserIsConnected()),
        getUserFriends : () => dispatch(get_user_friends()),
        logout: () => dispatch(logout())
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Main));