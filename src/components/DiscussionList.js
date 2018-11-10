import React, { Component } from 'react';

import DiscussionThumbnail from "./DiscussionList/DiscussionThumbnail";


import "./DiscussionList.css"

class DiscussionList extends Component {

    listItemClick = (e) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.getAttribute("data-id"), 10);
        console.log("thumbnail id =", id);
        this.props.listItemClick(id);
    }
    
    render() {
        const listOfDiscussions = this.props.discussions || [];

        const listOfDiscussionsThumbnails = listOfDiscussions.map((disc) => (
            <li key={disc.id}>
                <a href=" #" data-id={disc.id} onClick={ this.listItemClick }>
                    <DiscussionThumbnail
                        friendsProfilePicture={disc.friendsProfilePicture}
                        friendsName={disc.friendsName}
                        lastMessage={disc.lastMessage}
                        unreadMessagesCount = { disc.unreadMessagesCount }
                    />
                </a>
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