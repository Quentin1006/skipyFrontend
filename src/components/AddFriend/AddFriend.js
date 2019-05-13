import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from "@material-ui/core";
import { PersonAdd as PersonAddIcon } from "@material-ui/icons"

class AddFriend extends PureComponent {
    render() {
        return (
        <IconButton
            onClick={(e) => {e.stopPropagation(); console.log("added")}}
        >
            <PersonAddIcon />
        </IconButton>   
        );
    }
}

AddFriend.propTypes = {

};

export default AddFriend;
