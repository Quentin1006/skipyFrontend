import React, { Component } from 'react';

import ConfirmationDialog from "../lib/Components/ConfirmationDialog";

class ShowLeaveDiscussionDialog extends Component {
    render() {
        const { onAccept, onCancel } = this.props;
        return (
           <ConfirmationDialog 
                title = {"Leave Discussion"}
                onAccept = {onAccept}
                onCancel = {onCancel}
                open={true}

            >
                You are writing a message, if you leave, your message will be erased
            </ConfirmationDialog>
        );
    }
}


export default ShowLeaveDiscussionDialog;