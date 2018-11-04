import React, { Component } from 'react';

import "./DiscussionActions.css";

const ENTER = 13;

class DiscussionActions extends Component {
    constructor(props){
        super(props);

        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown(e){
        if(e.keyCode === ENTER){
            const msg = e.currentTarget.value;
            this.props.onSendMessage(msg);
        }
    }


    render() {
        return (
            <div className="actions__wrapper">
                <div className="action__send-message">
                    <input 
                        type="text" 
                        id="sendMessage"
                        placeholder="Send your message..."
                        onKeyDown={this.onKeyDown} 
                    />
                </div>
                <div className="secondary-actions__wrapper">
                    Here could go some buttons actions like add a picture, send a sticker
                </div>
            </div>
        );
    }
}

export default DiscussionActions;