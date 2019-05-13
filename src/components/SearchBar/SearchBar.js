import React from 'react';
import PropTypes from 'prop-types';

import { InputBase, IconButton, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    Search as SearchIcon,
} from '@material-ui/icons';

import AutosuggestFormField from "../../lib/Components/AutosuggestFormField";
import SearchItem from "./SearchItem";
import { AddFriend } from "../AddFriend"
import { withSocketSearchConsumer } from '../SocketContext/SocketContext';




const styles = {
    menuItemRoot: {
        paddingBottom: 0,
        paddingTop: 0,
        borderBottom: "1px solid #eee",
        height: "inherit"
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
        <MenuItem selected={isHighlighted} component="div" classes={{root: classes.menuItemRoot}}>
            <SearchItem suggestion={suggestion} value={value} query={query}>
                <AddFriend />
            </SearchItem>
        </MenuItem>
        );
    }
  

    const renderInputComponent = (inputProps) => {
        const { classes: inputClasses, placeholder, ...other } = inputProps;

        return (
            <InputBase 
                placeholder={placeholder}
                className={classes.suggestInput}
                inputProps= {{
                    classes: inputClasses
                }}
                {...other}
            />
        )
    }

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
    withSocketSearchConsumer()(
        withStyles(styles)(
            SearchBar
        )
    )