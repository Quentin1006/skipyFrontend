import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

import NavigationIcon from '@material-ui/icons/Navigation';

import skipyLogo from "../images/skipy_logo.png"


const styles = theme => ({
    homeWrapper: {
        display:"flex",
        alignItems:"center",
        justifyContent:" center",
        flexDirection: "column",
        height: "calc(100vh - 64px)"
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#3f51b5",
        padding: "60px 60px",
        color: "white",
    
    },
    imgLogo: {
        position: "relative",
        top: 25,
        margin: "0 15px"
    }
})


class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.homeWrapper}>
                <Paper className={classes.content}>
                    <h1>
                        Welcome to 
                        <img 
                            className={classes.imgLogo} 
                            src={skipyLogo}
                            alt="skipy logo"
                            width={150} 
                            height={80}
                        />
                    </h1>
                    <br/><br/>
                    <Link to="/app/messenger">
                        <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                            <NavigationIcon className={classes.extendedIcon} />
                            go to messenger
                        </Fab>
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Home);