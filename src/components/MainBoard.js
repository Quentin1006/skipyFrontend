import React, { Component } from 'react';

import DiscussionList from "../components/DiscussionList";
import DiscussionLayout from "../components/DiscussionLayout";
import WelcomeLayout from "../components/WelcomeLayout";


import "./MainBoard.css";


class MainBoard extends Component {

    constructor(props){
        super(props);
        this.discsOverview = this.getOverview();
    }

    shouldComponentUpdate(prevProps){
        if(prevProps.discussions !== this.props.discussions){
            this.discsOverview = this.getOverview();
            return true;
        }
        else {
            return false;
        }
    }

    getOverview = () => {
        const { discussions } = this.props;
        return discussions.map( disc => {
            const friends = disc.with;
            return {
                friendsName: `${friends.firstname} ${friends.lastname}`,
                friendsProfilePicute:friends.profilepicture,
                lastMessage:disc.lastMessage.content
            }
        });
    }

    render() {
        const { isDiscussionOpened,  discussions} = this.props;
        
        return (
            <div className="mainboard__wrapper">
                <div className="discussions-list__wrapper">
                    <DiscussionList discussions={this.discsOverview}/>  
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

export default MainBoard;