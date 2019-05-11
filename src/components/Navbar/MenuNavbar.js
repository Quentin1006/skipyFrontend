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
  InputBase
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';

import AutosuggestFormField from "../../lib/Components/AutosuggestFormField";

import { withSocketSearchConsumer } from "../SocketContext/SocketContext";




const styles = {
  root: {
    flexGrow: 1,
  },

  iconButtonRoot: {
    padding: "4px"
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
  userInteraction: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 auto"
  },
  searchBar: {
    display: "flex",
    flexGrow: 1,
    margin: "0 10%",
    backgroundColor: "#fff",
    borderRadius: "4px"
  },
  searchInput: {
    flex: "1 1 auto",
    display: "flex",
    alignItems: "center"
  },
  searchBtn: {
    flex:"0 0 auto",
  },
  suggestInput: {
    width:"100%",
    paddingLeft: "15px"
  }
};


// Reapeated in DiscussionHeader.js l8
const getFriendName = friend => {
  const { firstname, lastname } = friend;
  return `${firstname} ${lastname}`;
}


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

  renderInputComponent = (inputProps) => {
    const { classes, placeholder, ...other } = inputProps;
    return (
      <InputBase 
        placeholder={placeholder}
        className={this.props.classes.suggestInput}
        inputProps= {{
          classes
        }}
        {...other}
      />
    )
  }




  render() {
    const { classes, searchUsers, matches, isLoggedIn } = this.props;
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
              <div className={classes.userInteraction}>
                <div className={classes.searchBar}>
                  <div className={classes.searchInput}>
                    <AutosuggestFormField
                      inputComponent={this.renderInputComponent}
                      nbOfSuggestions={3}
                      getSuggestions={searchUsers}
                      listOfSuggestions= {matches}
                      getSuggestionValue={getFriendName}
                      onHandleChange={() => {console.log("handleInputChange")}}
                      onSuggestionSelected={() =>{console.log("onSuggestionSelected")}}    
                      inputProps={{
                        placeholder:"Find someone...",
                        classes: classes.suggestInput
                      }

                      }
                    />
                  </div>
                  <div className={classes.searchBtn}>
                    <IconButton
                      classes={{
                        root: classes.iconButtonRoot
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </div>
                </div>
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
              </div>
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
withSocketSearchConsumer()(
  withStyles(styles)(
    MenuAppBar
  )
);
