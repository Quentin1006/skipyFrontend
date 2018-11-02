import React, { Component } from 'react';

import DiscussionThumbnail from "./DiscussionThumbnail";


import "./DiscussionList.css"

class DiscussionList extends Component {

    listItemClick = (e) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        console.log("thumbnail id =", id);
        this.props.listItemClick(id);
    }
    
    render() {
        const listOfDiscussions = this.props.discussions || [];

        const listOfDiscussionsThumbnails = listOfDiscussions.map((disc) => (
            <li key={disc.id}>
                <a href=" #" data-id={disc.id} onClick={ this.listItemClick }>
                    <DiscussionThumbnail
                        friendsProfilepic={disc.friendsProfilepic}
                        friendsName={disc.friendsName}
                        lastMessage={disc.lastMessage}
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