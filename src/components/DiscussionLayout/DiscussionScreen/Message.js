import React, { Component } from 'react';



import "./Message.css";

class Message extends Component {
    
    render() {
        const { children } = this.props;
        // important to pass the props so the tooltip 
        // around the message can display itself
        const props = this.props;

        return (
            <div  {...props} className="message__wrapper">
                <div className="message__box">
                    {children}
                </div>
            </div>
        );
    }
}

export default Message;