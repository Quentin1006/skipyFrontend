import React, { Component } from 'react';


import Fab from "@material-ui/core/Fab";

import "./WelcomeLayout.css";


class WelcomeLayout extends Component {
    constructor(props){
        super(props);

        this.state = {
            friendToDiscussWith: ""
        }
    }   

    
    render() {
        const  { profile, startDiscussion } = this.props;
        return (
            <div className="welcome-layout__wrapper">
                <div className="welcome-layout__content">
                    <div className="welcome-layout__welcome-message">Hey <b>{profile.username}</b> !</div>
                    <div className="welcome-layout__profilepicture">
                        <img src={profile.profilepic} alt="user"/>
                    </div>

                    <Fab variant="extended" onClick={startDiscussion}>{"start discussion"}</Fab>
                    
                </div>
                
            </div>
           
        );
    }
}

export default WelcomeLayout;