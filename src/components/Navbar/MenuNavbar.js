import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import { 
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
} from '@material-ui/core';


import {
  Menu as MenuIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  AccountCircle
} from '@material-ui/icons'

import { SearchBar } from '../SearchBar';
import MenuAction from "./MenuAction"
import MenuNotifications from './MenuNotifications';


const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    height: 64,
    position: "relative",
    zIndex: 1000
  },  
};


class MenuNavbar extends React.Component {
  state = {
    anchorActionEl: null,
    anchorNotifEl: null
  };



  handleNotif = event => {
    this.setState({ anchorNotifEl: event.currentTarget });
  }


  handleMenu = event => {
    this.setState({ anchorActionEl: event.currentTarget });
  };


  handleClose = () => {
    this.setState({ anchorActionEl: null, anchorNotifEl:null });
  };


  handleLogout = () => {
    const { logout } = this.props;
    this.handleClose();
    logout();
  }


  render() {
    const { classes, isLoggedIn } = this.props;
    const { anchorActionEl, anchorNotifEl } = this.state;
    const openAction = Boolean(anchorActionEl);
    const openNotif = Boolean(anchorNotifEl);

    return (
      <div className="container">
        <AppBar position="static">
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu"
              onClick={() =>{}}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
            <Link to="/app" style={{display: "inline-block"}}>
              SKIPY
            </Link>
            </Typography>
            {isLoggedIn && (   
              <>
              <SearchBar/>
              
              <IconButton 
                color="inherit" 
                component={Link}
                to="/app/messenger"
              >
                <MessageIcon />
              </IconButton>

              <IconButton 
                color="inherit" 
                aria-owns={openAction ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleNotif}
              >
                <NotificationsIcon />
              </IconButton>
              
              <IconButton
                aria-owns={openAction ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <MenuNotifications
                  anchorEl={anchorNotifEl}
                  open={openNotif}
                  onClose={this.handleClose}
              >
              </MenuNotifications>

              <MenuAction
                  anchorEl={anchorActionEl}
                  open={openAction}
                  onClose={this.handleClose}
              >
                <Link to="/app/profile">
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                </Link>
                <Link to="/app/profile">
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Link>
                <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
              </MenuAction>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default 
  withStyles(styles)(
    MenuNavbar
  )
