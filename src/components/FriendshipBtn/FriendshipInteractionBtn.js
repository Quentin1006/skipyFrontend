import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withSocketConsumer } from '../SocketContext/SocketContext';


import { FRIENDSHIP_STATUS } from "../../config";
import { PendingFsBtn, InexistantFsBtn, DeclinedFsBtn, ConfirmedFsBtn } from './';
import TinyLabel from "../../lib/Components/Label/TinyLabel";

const { PENDING, DECLINED, CONFIRMED, INEXISTANT } = FRIENDSHIP_STATUS

// Create a component 

class FriendshipInteractionBtn extends PureComponent {
    setInteractionBtn = () => {
        const { 
            person, 
            answerFriendRequest,
            sendFriendRequest,
            cancelFriendRequest 
        } = this.props;
        const {status, initBy} = person.fshipStatus;

        switch(status){
            case PENDING:
                return  (
                    <PendingFsBtn 
                        person={person}
                        initBy={initBy}
                        answerFriendRequest={answerFriendRequest}
                        cancelFriendRequest={cancelFriendRequest}
                    />
                )
            case CONFIRMED:
                return  (
                    <ConfirmedFsBtn
                        person={person}
                        cancelFriendRequest={cancelFriendRequest}
                    />
                )
            case DECLINED:
                return  (
                    <DeclinedFsBtn 
                        person={person}
                        initBy={initBy}
                        sendFriendRequest={sendFriendRequest}
                    />
                )
            case INEXISTANT:
                return  (
                    <InexistantFsBtn 
                        person={person}
                        sendFriendRequest={sendFriendRequest}
                    />
                )
            default:
                return  <TinyLabel label="you"/>
        }
    }

    render() {
        return this.setInteractionBtn();
    }
}

FriendshipInteractionBtn.propTypes = {
    person: PropTypes.object,
    cancelFriendRequest: PropTypes.func.isRequired,
    answerFriendRequest: PropTypes.func.isRequired,
    sendFriendRequest: PropTypes.func.isRequired

};

export default 
    withSocketConsumer(["friendship"])(
        FriendshipInteractionBtn
    );
