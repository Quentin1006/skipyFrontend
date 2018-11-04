import React, { Component } from 'react';

import MessagesScreen from "./DiscussionLayout/MessagesScreen";

import "./DiscussionLayout.css";

class DiscussionLayout extends Component {
    render() {
        const { disc } = this.props;
        const { messages, user, friend, id } = disc;

        const users = {
            [user.id]: user,
            [friend.id]: friend
        }

        return (
            <div>
                <MessagesScreen 
                    messages={messages}
                    user={user}
                />
            </div>
        );
    }
}

export default DiscussionLayout;