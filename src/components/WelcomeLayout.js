import React, { Component } from 'react';


//import FormDialog from "../lib/Components/FormDialog";
//import AutosuggestFormField from "../lib/Components/AutosuggestFormField"

import ExtendedButton from "../lib/Components/ExtendedButton";

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
                        <img src={profile.profilepicture} alt="user"/>
                    </div>

                    <ExtendedButton onClick={startDiscussion}>{"start discussion"}</ExtendedButton>

                    {/*<FormDialog
                        text= "To subscribe to this website, please enter your email address here. We will send updates occasionally."
                        title="Start your conversation"
                        triggerBtnText="new conversation"
                        onValidateForm={startDiscussion}
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
                        
                        </FormDialog>*/}
                    
                </div>
                
            </div>
           
        );
    }
}

export default WelcomeLayout;