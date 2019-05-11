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

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';

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
    anchorEl: null,
  };


  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };


  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  handleLogout = () => {
    const { logout } = this.props;
    this.handleClose();
    logout();
  }


  render() {
    const { classes, isLoggedIn } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
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
