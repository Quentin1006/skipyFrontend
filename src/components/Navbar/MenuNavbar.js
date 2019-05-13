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
  Menu,
} from '@material-ui/core';


import {
  Menu as MenuIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  AccountCircle
} from '@material-ui/icons'

import { SearchBar } from '../SearchBar';


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


class MenuAppBar extends React.Component {
  state = {
    anchorActionEl: null,
  };


  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleNotif = event => {
    return;
  }


  handleMenu = event => {
    this.setState({ anchorActionEl: event.currentTarget });
  };


  handleClose = () => {
    this.setState({ anchorActionEl: null });
  };


  handleLogout = () => {
    const { logout } = this.props;
    this.handleClose();
    logout();
  }


  render() {
    const { classes, isLoggedIn } = this.props;
    const { anchorActionEl } = this.state;
    const openAction = Boolean(anchorActionEl);

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

              <Menu
                id="menu-appbar"
                anchorEl={anchorActionEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                getContentAnchorEl={null}
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
              </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default 
  withStyles(styles)(
    MenuAppBar
  )
