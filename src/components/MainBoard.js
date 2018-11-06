import React, { Component } from 'react';

import DiscussionList from "../components/DiscussionList";
import DiscussionLayout from "../components/DiscussionLayout";
import WelcomeLayout from "../components/WelcomeLayout";


import "./MainBoard.css";


class MainBoard extends Component {

    constructor(props){
        super(props);
        const { discussions } = this.props;
        this.discsOverview = getOverview(discussions);
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.discussions && nextProps.discussions !== this.props.discussions){
            this.discsOverview = getOverview(nextProps.discussions)
            return true;
        }

        if(nextProps.discOpened !== this.discOpened){
            return true;
        }
        return false;
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.discussions !== this.props.discussions){
    //         this.discsOverview = this.getOverview();
    //     }
    // }

    render() {
        const { isDiscOpened, profile, discOpened} = this.props;
        // How to do for it not to be recalculated every time it re-renders
        // When it stays unchanged
        // this.discsOverview = this.getOverview();
        
        
        return (
            <div className="mainboard__wrapper">
                <div className="discussions-list__wrapper">
                    <DiscussionList 
                        discussions={this.discsOverview} 
                        listItemClick = {this.props.listItemClick} />  
                </div>
                <div className="discussion-content__wrapper">
                    {isDiscOpened 
                        ? <DiscussionLayout disc={discOpened }/> 
                        : <WelcomeLayout userProfile={profile} />}
                </div>
            
            </div>
        );
    }
}


const getOverview = (discussions) => {
    return discussions.map( disc => {
        const friends = disc.with;
        return {
            id: disc.id,
            friendsName: `${friends.firstname} ${friends.lastname}`,
            friendsProfilePicture:friends.profilepicture,
            lastMessage:disc.lastMessage.content || ""
        }
    });
}


export default MainBoard;