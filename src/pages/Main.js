import React, { Component } from 'react';

import { connect } from "react-redux";
import './Main.css';

import Login from "../components/Login";
import MainBoard from "../components/MainBoard";


import { getUserDiscussions } from "../actions/discussions";



const testDiscussions= [
    {
        friendsProfilepic: "entete-carre-magenta.png",
        friendsName:"Liam Neeson",
        lastMessage:"Long time no see pal! But i need to add some text to really see how it fits, eventhough its getting quite, i think we haven't met the limit. Now it should be good"
    },
    {
        friendsProfilepic: "entete-carre-magenta.png",
        friendsName:"Coco Nuts",
        lastMessage:"Just a short text"
    }
]



class Main extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { dispatch, isLoggedIn, profile } = this.props;
        if(isLoggedIn && profile){
            dispatch(getUserDiscussions(profile.id));
        }
       
    }

    componentDidUpdate(prevProps){
        const { isLoggedIn, dispatch, profile } = this.props;
        if(isLoggedIn && prevProps.isLoggedIn !== isLoggedIn && profile){
            dispatch(getUserDiscussions(profile.id));
        }
    }

    render(){
        const {discussions, isLoggedIn, isDiscussionOpened } = this.props;

        return (
            <div className="main__wrapper">
                {
                    isLoggedIn 
                    ? <MainBoard 
                        discussions={discussions} 
                        isDiscussionOpened={isDiscussionOpened}/>
                    : <Login />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { discussions } = state;
    const isDiscussionOpened = !!state.isDiscussionOpened;
    const isLoggedIn = state.userprofile.isLoggedIn;
    const profile = state.userprofile.profile || null;
  

    return {
        discussions,
        isDiscussionOpened,
        isLoggedIn,
        profile
    }
}

export default connect(mapStateToProps)(Main);