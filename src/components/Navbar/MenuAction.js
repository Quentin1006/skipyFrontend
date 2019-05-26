import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { 
    Menu,
  } from '@material-ui/core';


const styles = {
    paperMenu: {
        marginTop: "10px",
        minWidth: "200px",
        borderRadius: "0px",
        overflow: "inherit",
        '&:before':{
            content:"''",
            width:"16px",
            height:"16px",
            position: "absolute",
            top: "-8px",
            right: "16px",
            transform: "rotate(45deg)",
            backgroundColor: "#fff"
        }
    },
   

}

class MenuAction extends PureComponent {
    render() {
        const {anchorEl, open, onClose, children, classes } = this.props
        return (
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                getContentAnchorEl={null}
                open={open}
                onClose={onClose}
                classes= {{
                    paper: classes.paperMenu
                }}
            >
                {children}
            </Menu>
        );
    }
}

MenuAction.propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.instanceOf(Element),
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any,
    classes: PropTypes.object
};

export default withStyles(styles)(MenuAction);