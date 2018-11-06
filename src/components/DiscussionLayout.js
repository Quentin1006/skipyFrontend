import React, { Component } from 'react';


import DiscussionScreen from "./DiscussionLayout/DiscussionScreen";
import DiscussionHeader from "./DiscussionLayout/DiscussionHeader";
import DiscussionActions from "./DiscussionLayout/DiscussionActions";


import "./DiscussionLayout.css";


class DiscussionLayout extends Component {

    render() {
        const { disc, openDiscId } = this.props;
        const { messages, user, friend } = disc;

        // const users = {
        //     [user.id]: user,
        //     [friend.id]: friend
        // }

        return (
            <div className="discussion-layout__container">
                <div className="discussion-header__container">
                    <DiscussionHeader 
                        user={user}
                        friend={friend}
                    />
                </div>
                <div className="discussion-screen__container">
                    <DiscussionScreen 
                        discId={openDiscId}
                        messages={messages}
                        user={user}
                    />
                </div>
                
                <div className="discussion-action__container">
                    <DiscussionActions
                        onSendMessage={this.props.onSendMessage}
                    />
                </div>
                
            </div>
        );
    }
}




export default DiscussionLayout;