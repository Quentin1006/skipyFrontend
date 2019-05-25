import React from 'react';
import PropTypes from 'prop-types';

import { InputBase, IconButton, ListItem, ListItemSecondaryAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    Search as SearchIcon,
} from '@material-ui/icons';

import AutosuggestFormField from "../../lib/Components/AutosuggestFormField";
import SearchItem from "./SearchItem";
import { FriendshipInteractionBtn } from "../FriendshipBtn"
import { withSocketConsumer } from '../SocketContext/SocketContext';


const styles = {
    menuItemRoot: {
        paddingBottom: 0,
        paddingTop: 0,
        borderBottom: "1px solid #eee",
        height: "inherit",
        color: "grey"
    },

    userInteraction: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 1 auto"
      },

    iconButtonRoot: {
        padding: "4px"
    },
    searchBar: {
        display: "flex",
        flexGrow: 1,
        margin: "0 10%",
        backgroundColor: "#fff",
        borderRadius: "4px"
    },
    searchInput: {
        flex: "1 1 auto",
        display: "flex",
        alignItems: "center"
    },
    searchBtn: {
        flex:"0 0 auto",
        borderLeft: "1px solid #eee"
    },
    suggestInput: {
        width:"100%",
        paddingLeft: "15px"
    }
}


// Reapeated in DiscussionHeader.js l8
const getFriendName = friend => {
    const { firstname, lastname } = friend;
    return `${firstname} ${lastname}`;
}


const SearchBar = ({ search, matches, classes }) => {

    const suggestionComponent = (suggestion, {query, isHighlighted}) => {
        const value = getFriendName(suggestion);
        return (
            <ListItem button selected={isHighlighted} component="div" classes={{root: classes.menuItemRoot}}>
                <SearchItem suggestion={suggestion} value={value} query={query}/>
                <ListItemSecondaryAction>
                    <FriendshipInteractionBtn person={suggestion}/>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
  

    const renderInputComponent = ({ classes: inputClasses, placeholder, ...other }) => (
        <InputBase 
            placeholder={placeholder}
            className={classes.suggestInput}
            inputProps= {{
                classes: inputClasses,
                ...other
            }}      
        />
    )

    return (
        <div className={classes.searchBar}>
            <div className={classes.searchInput}>
                <AutosuggestFormField
                    inputComponent={renderInputComponent}
                    nbOfSuggestions={3}
                    getSuggestions={search}
                    getSuggestionValue={getFriendName}
                    listOfSuggestions= {matches}
                    suggestionComponent={suggestionComponent}
                    handleChange={() => {console.log("handleInputChange")}}
                    onSuggestionSelected={() =>{console.log("onSuggestionSelected")}}    
                    inputProps={{
                        placeholder:"Find someone...",
                        classes: classes.suggestInput
                    }}
                />
            </div>
            <div className={classes.searchBtn}>
            <IconButton
                classes={{
                    root: classes.iconButtonRoot
                }}
            >
                <SearchIcon />
            </IconButton>
            </div>
        </div>
    )
    
}

SearchBar.propTypes = {
    search: PropTypes.func.isRequired,
    matches: PropTypes.array.isRequired,
    classes: PropTypes.object
};

export default 
    withSocketConsumer(["search", "notifications"])(
        withStyles(styles)(
            SearchBar
        )
    )