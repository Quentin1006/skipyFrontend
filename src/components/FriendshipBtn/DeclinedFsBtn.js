import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from "@material-ui/core";
import { PersonAdd as PersonAddIcon } from "@material-ui/icons"

class DeclinedFsBtn extends PureComponent {

    isInitByYou = () => {
        const { initBy, person } = this.props;
        return initBy !== person.id;
    }


    handleClick = (id) => {
        const { sendFriendRequest } = this.props;
        return (e) => {
            e.stopPropagation();
            if(!this.isInitByYou()){
                sendFriendRequest(id)
            }
        }
    }


    render() {
        const { person } = this.props;
        const initByYou = this.isInitByYou();
        return (
            <>
            <IconButton
                onClick={this.handleClick(person.id)}
                disabled={initByYou}
            >
                { !initByYou && <PersonAddIcon />}
            </IconButton> 
            </>  
        );
    }
}

DeclinedFsBtn.propTypes = {
    person: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number, 
            PropTypes.string
        ]).isRequired
    }),
    sendFriendRequest: PropTypes.func.isRequired
};

export default DeclinedFsBtn;
