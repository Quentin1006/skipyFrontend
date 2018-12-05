import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

class ConfirmationDialog extends Component {
    render() {
        const {title, children, open, onAccept, onCancel } = this.props;
        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open= {open}
            >
                <DialogTitle>{ title }</DialogTitle>
                <DialogContent>
                    { children }
                </DialogContent>
            
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onAccept} color="primary">
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmationDialog.propTypes = {
    onAccept: PropTypes.func.isRequired
};

export default ConfirmationDialog