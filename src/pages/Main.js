import React, { Component } from 'react';

import { connect } from "react-redux";
import './Main.css';


import DiscussionList from "../components/DiscussionList";
import DiscussionLayout from "../components/DiscussionLayout";
import WelcomeLayout from "../components/WelcomeLayout";

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
        const { dispatch } = this.props;
        dispatch(getUserDiscussions(0));
    }

    render(){
        const { isDiscussionOpened, discsOverview } = this.props;

        return (
            <div className="main__wrapper">
                <div className="discussions-list__wrapper">
                    <DiscussionList discussions={discsOverview}/>  
                </div>
                <div className="discussion-content__wrapper">
                    {isDiscussionOpened 
                        ? <DiscussionLayout messages={[]} friendProfile={""} userProfile={""}/> 
                        : <WelcomeLayout userProfile={""}/>}
                </div>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { discussions } = state;

    const discsOverview = discussions.map( disc => {
        const friends = disc.with
        return {
            friendsName: `${friends.firstname} ${friends.lastname}`,
            friendsProfilePicute:friends.profilepicture,
            lastMessage:disc.lastMessage.content

        }
    })
    
    return {
        discsOverview,
        isDiscussionOpened: true

    }
}

export default connect(mapStateToProps)(Main);