import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from "@material-ui/core";

import {
    Clear as DeclineIcon,
    Done as ConfirmIcon
} from "@material-ui/icons";

import TinyLabel from "../../lib/Components/Label/TinyLabel";


class PendingFsBtn extends PureComponent {

    render() {
        const { initBy, person, answerFriendRequest, cancelFriendRequest } = this.props;
        return (
            initBy !== person.id
            ?   
                <>
                    <TinyLabel label={"cancel"} />
                    <IconButton 
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            cancelFriendRequest(person.id)
                        }}
                    >
                        <DeclineIcon />
                    </IconButton>   
                </>
                
            :   <>
                    <TinyLabel label={"accept"} />
                    <IconButton 
                        onClick={(e) => {
                            e.stopPropagation();
                            answerFriendRequest(person.id, false)
                        }}
                    >
                        <DeclineIcon/>
                    </IconButton> 

                    <IconButton 
                        onClick={(e) => {
                            e.stopPropagation();
                            answerFriendRequest(person.id, true)
                        }}    
                    >
                        <ConfirmIcon/>
                    </IconButton>
                </>
        );
    }
}

PendingFsBtn.propTypes = {
    initBy: PropTypes.any,
    person: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    }), // person represent the other in the relationship
    cancelFriendRequest: PropTypes.func,
    answerFriendRequest: PropTypes.func
};

export default PendingFsBtn;
