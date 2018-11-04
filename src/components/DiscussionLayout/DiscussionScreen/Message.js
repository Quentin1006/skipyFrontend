import React, { Component } from 'react';



import "./Message.css";

class Message extends Component {
    
    render() {
        const { content } = this.props;

        return (
            <div className={"message__wrapper"}>
                <div className="message__box">
                    {content}
                </div>
            </div>
        );
    }
}

export default Message;