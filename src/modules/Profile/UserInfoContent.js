import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import {Tabs, TabPanel } from "../../lib/Components/Tabs"


import AboutUser from "./UserInfoContent/AboutUser";
import FriendsUser from "./UserInfoContent/FriendsUser";


const styles = (theme) => ({
    container: {
        width: "100%",
        minHeight: 50,
        marginBottom: 40
    },
    tabPanel: {
        padding: 20
    }

})

class UserInfoContent extends Component {

    render() {
        const { userprofile, updateUser, getFriends, classes } = this.props;
        return (
            <Paper square className={classes.container}>
                <Tabs>
                    <TabPanel label="about">
                        <AboutUser 
                            userprofile={userprofile}
                            updateUser={updateUser}
                        />
                    </TabPanel>
                    <TabPanel label="friends">
                        <FriendsUser 
                            getFriends = {getFriends} 
                        />
                    </TabPanel>
                </Tabs>
            </Paper>
        );
    }
}

export default withStyles(styles)(UserInfoContent);