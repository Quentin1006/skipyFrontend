import React, { Component } from 'react';

class DiscussionLayout extends Component {
    render() {
        const { disc } = this.props;
        const { messages, user, friend, id } = disc;
        return (
            <div>
                This is Discussion Layout
                <p>DISD ID = {id}</p>
            </div>
        );
    }
}

export default DiscussionLayout;