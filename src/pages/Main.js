import React, { Component } from 'react';


import { connect } from "react-redux";
import { withCookies } from 'react-cookie';

import Logger from "../lib/Logger";

import './Main.css';

import Login from "../components/Login";
import MainBoard from "../components/MainBoard";
import MenuNavbar from "../components/MenuNavbar";


import { 
    getUserFriends,
    checkIfUserIsConnected ,
    logout
} from "../actions/userprofile";


const logger = new Logger("Main");
logger.info("bip")


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
        const { checkIfUserIsConnected } = this.props;
        checkIfUserIsConnected();

        
    }

    componentDidMount(){
        const { isLoggedIn, profile } = this.props;

        if(isLoggedIn && profile){
            getUserFriends(profile.id);
        }
       
    }

    componentDidUpdate(prevProps){
        const { isLoggedIn, getUserFriends, profile } = this.props;
        if(isLoggedIn && prevProps.isLoggedIn !== isLoggedIn && profile){
            getUserFriends(profile.id);
        }
    }

    

    render(){
        const {
            isLoggedIn, 
            profile, 
            friendlist,
            cookies,
            logout
        } = this.props;
        
        return (
            <div className="main__container">
                <div className="menu-navbar__container">
                    <MenuNavbar 
                        isLoggedIn={isLoggedIn} 
                        title={"skipy"}
                        logout={logout}
                    />
                </div>
                <div className="mainboard__container">
                {
                    isLoggedIn 
                    ? <MainBoard 
                        profile={profile}
                        friendlist= {friendlist}
                      />
                    : <Login cookies={cookies}/>
                }
                </div>
                
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
        getUserFriends : (userId) => dispatch(getUserFriends(userId)),
        logout: () => dispatch(logout())
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Main));