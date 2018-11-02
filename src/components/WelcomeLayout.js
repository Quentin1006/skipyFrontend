import React, { Component } from 'react';

import "./WelcomeLayout.css";

class WelcomeLayout extends Component {
    
    startConversation = () => {
        // display pop up 
    }

    render() {
        return (
            <div className="welcome-layout__wrapper">
                <p>This is the WelcomeLayout</p>
                <button onClick={this.startConversation}>Start a conversation</button>
            </div>
           
        );
    }
}

export default WelcomeLayout;