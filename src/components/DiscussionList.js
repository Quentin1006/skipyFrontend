import React, { Component, Fragment } from 'react';

import DiscussionThumbnail from "./DiscussionList/DiscussionThumbnail";
import DiscussionThumbnailTemp from "./DiscussionList/DiscussionThumbnailTemp";


import "./DiscussionList.css"
//import { tempDisc } from '../reducers/discussions';

class DiscussionList extends Component {

    listItemClick = (e) => {
        e.preventDefault();
        const dataId = e.currentTarget.getAttribute("data-id");
        const discId = dataId.includes("temp") ? dataId : parseInt(dataId, 10);
        console.log("thumbnail id =", discId);
        this.props.listItemClick(discId);
    }


    renderTempDisc = () => {
        const { openDiscId, tempDisc, closeNewDiscussion } = this.props;
        return (
            <li key={tempDisc.id}>
                <a 
                href=" #" 
                data-id={tempDisc.id} 
                onClick={ this.listItemClick } 
                className={openDiscId === tempDisc.id ? "highlighted" : ""}
                >
                    {
                        tempDisc.id 
                        && <DiscussionThumbnailTemp close={closeNewDiscussion}/> 
                    }
                </a>
            </li>
                    
        )
    }
    
    render() {
        const { openDiscId, children, tempDisc, discsOverview=[] } = this.props

        const listOfDiscussionsThumbnails = discsOverview.map((disc) => (
            <li key={disc.id}>
                <a href=" #" data-id={disc.id} onClick={ this.listItemClick } className={openDiscId === disc.id ? "highlighted" : ""}>
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
            <Fragment>
                <div className="discussion-list__btns">
                    {children}
                </div>

                <ul className="discussion-list__content">
                    {tempDisc.id && this.renderTempDisc()}
                    {listOfDiscussionsThumbnails}
                </ul>
            </Fragment>
            
        );
    }
}

export default DiscussionList;