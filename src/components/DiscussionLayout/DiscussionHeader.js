import React, { Component } from 'react';

import TransfertIcon from "@material-ui/icons/Repeat";
import AutosuggestFormField from "../../lib/Components/AutosuggestFormField"
import "./DiscussionHeader.css";


const getFriendName = friend => {
    const { firstname, lastname } = friend;
    return `${firstname} ${lastname}`;
}

class DiscussionHeader extends Component {
    constructor(props){
        super(props);

        this.state = {
            friendToDiscussWith:""
        }
    }

    handleInputChange = newValue => {
        this.setState((state) => ({
            ...state,
            friendToDiscussWith: newValue
        }))

        
    }


    render() {
        const { 
            isTempDisc, 
            fetchMatchingFriends, 
            suggestions,
            setNewRecipient
        } = this.props;

        
        return (
            <div className="discussion-header__wrapper">
                
                {
                    isTempDisc 
                    ?   <AutosuggestFormField
                            nbOfSuggestions={3}
                            getSuggestions={fetchMatchingFriends}
                            listOfSuggestions= {suggestions}
                            getSuggestionValue={getFriendName}
                            onHandleChange={this.handleInputChange}
                            onSuggestionSelected={setNewRecipient}
                                    
                            inputProps={{
                            placeholder: "Enter a friend's name",
                            label: ""
                            }}
                        />
                    :   <div className="discussion-header__exchange">
                            <TransfertIcon style={{ fontSize: 40 }}/>
                        </div>
                }
                </div>

        );
    }
}

export default DiscussionHeader; 