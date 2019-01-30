import React, { Component, Fragment } from 'react';

import DiscussionThumbnail from "./DiscussionList/DiscussionThumbnail";
import DiscussionThumbnailTemp from "./DiscussionList/DiscussionThumbnailTemp";


import "./DiscussionList.css"
//import { tempDisc } from '../reducers/discussions';


class DiscussionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawer: this.isDrawer(),
            // O : close 1: first opening 2: open
            open: false
        }
    }
    

    componentDidMount(){
        
        window.addEventListener("resize", () => {
            const { isDrawer } = this.state;
            if(isDrawer !== this.isDrawer()){
                console.log("setting new state")
                this.setState({isDrawer: !isDrawer})
            };
            
        })
    }


    listItemClick = (e) => {
        e.preventDefault();
        const dataId = e.currentTarget.getAttribute("data-id");
        const discId = dataId.includes("temp") ? dataId : parseInt(dataId, 10);
        console.log("thumbnail id =", discId);
        this.props.listItemClick(discId);
    }


    isDrawer = () => {
        return window.innerWidth < this.props.minWidth;
    }


    closeList = () => {
        const { isDrawer } = this.state;
        if(!isDrawer)
            return;
        
        this.setState({open: false})
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
        const { openDiscId, children, tempDisc, discsOverview=[] } = this.props;
        const { isDrawer, open } = this.state;
        const hasClassOpen = isDrawer && open ? "open" : "";

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

        const list = (
            <Fragment>
                <div className="discussion-list__btns">
                    {children}
                </div>

                <ul className="discussion-list__content">
                    {tempDisc.id && this.renderTempDisc()}
                    {listOfDiscussionsThumbnails}
                </ul>
            </Fragment>
        )

        return (
            <Fragment>
                {
                    open &&
                    <div className="blackscreen" onClick={this.closeList}></div>
                }
                {
                    isDrawer 
                    ? <div className={`discussions-list__wrapper ${hasClassOpen}`}>
                        {list}
                    </div>
                    : <div className={`discussions-list__wrapper`}>
                        {list}
                    </div>
                }
            </Fragment> 
        );
    }
}

DiscussionList.defaultProps = {
    minWidth: 600
}

export default DiscussionList;