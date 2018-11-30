import React, { Component } from 'react';

import "./DiscussionActions.css";

const ENTER = 13;

class DiscussionActions extends Component {
    constructor(props){
        super(props);

        this.onHandleKeyDown = this.onHandleKeyDown.bind(this);
        this.onHandleFocus = this.onHandleFocus.bind(this);
    }

    componentDidMount(){
        this.sendInput.focus()
    }

    componentDidUpdate(){
        // Peut etre rajouter une variable qui distingue quand la discussion change
        // ou dans shouldUpdate
        //this.sendInput.focus()
    }

    onHandleKeyDown(e){
        const { onSendMessage } = this.props;
        if(e.keyCode === ENTER){
            const msg = (e.currentTarget.value).trim();

            if(msg !== ""){
                onSendMessage(msg);
                e.currentTarget.value = "";
            }
        }
    }

    onHandleFocus(e){
        this.props.onFocusSendInput();
    }


    render() {
        const { discId, children } = this.props;

        return (
            <div className="actions__wrapper">
                <div className="action__send-message">
                    <input 
                        type="text" 
                        id="sendMessage"
                        data-discid= {discId}
                        placeholder="Send your message..."
                        onKeyDown={this.onHandleKeyDown} 
                        onFocus={this.onHandleFocus}
                        ref={(input) => { this.sendInput = input; }} 
                    />
                </div>
                <div className="secondary-actions__wrapper">
                    {children}
                </div>
            </div>
        );
    }
}

export default DiscussionActions;