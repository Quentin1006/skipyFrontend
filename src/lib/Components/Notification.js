import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Snackbar } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';


const styles = {
    message: {
        display: "flex",
        alignItems: "center"
    },
    icon: {
        marginRight: "15px"
    }
}

class Notification extends Component {
    
    renderNotifIcon = (type) => {
        
        switch(type){
            case "info":
                return <InfoIcon style={{color:"#1976d2"}}/>;
            case "warning":
                return <WarningIcon style={{color:"#ffa000"}}/>;
            case "error":
                return <ErrorIcon style={{color:"#d32f2f"}}/>
            case "success":
                return <CheckCircleIcon style={{color:"#43a047"}}/>;
            default:
                return "";
        }
        
    }

    render() {
        const { close, message, type, classes } = this.props;

        return (
            <Snackbar
                open={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={close}
                message={
                    <span id="notification__message-id" className={classes.message}>
                        <span className={classes.icon}>{this.renderNotifIcon(type)}</span>
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={close}
                    >
                        <CloseIcon />
                    </IconButton>,
                  ]}


            
            />
        );
    }
}

Notification.propTypes = {

};



export default withStyles(styles)(Notification);