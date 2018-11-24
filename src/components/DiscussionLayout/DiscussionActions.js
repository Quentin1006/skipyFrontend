import React, { Component } from 'react';

import "./DiscussionActions.css";

const ENTER = 13;

class DiscussionActions extends Component {
    constructor(props){
        super(props);

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onFocus = this.onFocus.bind(this);
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
            console.log(this.sendInput);
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
        const { discId } = this.props;

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
                    Here could go some buttons actions like add a picture, send a sticker
                </div>
            </div>
        );
    }
}

export default DiscussionActions;