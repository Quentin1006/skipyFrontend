import React, { Component } from 'react';


import FormDialog from "../lib/Components/FormDialog";
import AutosuggestFormField from "../lib/Components/AutosuggestFormField"

import "./WelcomeLayout.css";

const getFriendName = friend => {
    const { firstname, lastname } = friend;
    return `${firstname} ${lastname}`;
}

class WelcomeLayout extends Component {
    constructor(props){
        super(props);

        this.state = {
            friendToDiscussWith: ""
        }
    }
    
    startConversation = () => {
        const { createTemporaryDiscussionThumbnail } = this.props;

    }

    


    render() {
        const  { friendlist, profile } = this.props;
        return (
            <div className="welcome-layout__wrapper">
                <div className="welcome-layout__content">
                    <div>Hey {profile.username} !</div>
                    <div className="welcome-layout__profilepicture">
                        <img src={profile.profilepicture} alt="user"/>
                    </div>
                    <FormDialog
                        text= "To subscribe to this website, please enter your email address here. We will send updates occasionally."
                        title="Start your conversation"
                        triggerBtnText="new conversation"
                        onValidateForm={this.startConversation}
                        validateText = "validate"
                    >
                        <AutosuggestFormField
                            listOfSuggestions={friendlist}
                            nbOfSuggestions={3}
                            getSuggestionValue={getFriendName}
                            onHandleChange={newValue => {
                                this.setState((state) => ({
                                    ...state,
                                    friendToDiscussWith: newValue
                                }))
                                    
                            }}
                            inputProps={{
                            placeholder: "Enter a friend's name",
                            label: ""
                            }}
                        />
                        
                    </FormDialog>
                    
                </div>
                
            </div>
           
        );
    }
}

export default WelcomeLayout;