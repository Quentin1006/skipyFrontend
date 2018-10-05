import React, { Component } from 'react';

import DiscussionThumbnail from "./DiscussionThumbnail";


import "./DiscussionList.css"

class DiscussionList extends Component {
    
    render() {
        const listOfDiscussions = this.props.discussions;

        const listOfDiscussionsThumbnails = listOfDiscussions.map((disc, idx) => (
            <li key={idx}>
                <DiscussionThumbnail
                    friendsProfilepic={disc.friendsProfilepic}
                    friendsName={disc.friendsName}
                    lastMessage={disc.lastMessage}
                />
            </li>
        ));

        return (
            <ul className="discussion-list__top">
                {listOfDiscussionsThumbnails}
            </ul>
        );
    }
}

export default DiscussionList;