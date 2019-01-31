import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Header from "./Header";
import UserInfoContent from './UserInfoContent';


const styles = {
    container: {
        maxWidth: 1080,
        padding:10,
        margin: "0 auto"
    }
}

class Profile extends Component {
    state= {
        
    }

    render() {
        const { 
            updateUser, 
            userprofile,  
            getFriends, 
            classes 
        }  = this.props;

        
        return (
            <div className={classes.container}>
                <Header 
                    landscape={userprofile.landscapePicture}
                    updateUser={updateUser}
                    ppicture={userprofile.profilepic}
                    firstname={userprofile.firstname}
                    lastname={userprofile.lastname}
                />

                <UserInfoContent 
                    userprofile={userprofile}
                    updateUser={updateUser}
                    getFriends = {getFriends} 
                />
            </div>
        );
    }
}

export default withStyles(styles)(Profile);