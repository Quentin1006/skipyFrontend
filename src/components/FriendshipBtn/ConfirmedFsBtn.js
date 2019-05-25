import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from "@material-ui/core";
import { PersonAddDisabled as PersonRemoveIcon } from "@material-ui/icons"

class AddFriendBtn extends PureComponent {
    render() {
        const { person, cancelFriendRequest } = this.props;
        return (
            <IconButton
                onClick={(e) => {
                    e.stopPropagation();
                    cancelFriendRequest(person.id);
                }}
            >
                <PersonRemoveIcon />
            </IconButton>   
        );
    }
}

AddFriendBtn.propTypes = {
    person: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    }), // person represent the other in the relationship
    cancelFriendRequest: PropTypes.func,
};

export default AddFriendBtn;
