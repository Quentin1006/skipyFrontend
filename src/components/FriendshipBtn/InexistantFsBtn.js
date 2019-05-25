import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from "@material-ui/core";
import { PersonAdd as PersonAddIcon } from "@material-ui/icons"

class InexistantFsBtn extends PureComponent {
    render() {
        const { person, sendFriendRequest } = this.props;
        return (
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    sendFriendRequest(person.id)
                }}
            >
                <PersonAddIcon />
            </IconButton>   
        );
    }
}

InexistantFsBtn.propTypes = {
    person: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number, 
            PropTypes.string
        ]).isRequired
    }),
    sendFriendRequest: PropTypes.func.isRequired
};

export default InexistantFsBtn;
