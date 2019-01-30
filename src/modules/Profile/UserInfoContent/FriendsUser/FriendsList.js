import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import FriendInfoThumbnail from './FriendInfoThumbnail';

 
const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "40px 20px",
        backgroundColor: "#eee"
    },

    thumbnailWrapper: {
        display: "flex",
        boxSizing: "border-box",
        width: "50%"
    },
    showMoreBtn: {
        display: "flex",
        width:"100%",
        justifyContent: "center",
        marginTop: 10
    }
})


class FriendsList extends Component {
    state= {
        nbToDisplay: this.props.maxToDisplay
    }


    renderListAsThumbnail = (friendList, classes) => (
        friendList.map((friend, key) => (
            <div className={classes.thumbnailWrapper} key={friend.id || key}>
                <FriendInfoThumbnail {...friend} />
            </div>
            
        ))
            )
    
    render() {
        const { list, increaseNbDisplayed, nbToDisplay, classes } = this.props;
        const listToDisplay = list.slice(0, nbToDisplay);

        return (
            <div className={classes.container}>
                {
                    list.length === 0 
                    ? <h3>No friend matches the filter...</h3>
                    : this.renderListAsThumbnail(listToDisplay, classes)
                }
                {
                    list.length > listToDisplay.length && 
                    <div className={classes.showMoreBtn}>
                        <Button variant="outlined" onClick={increaseNbDisplayed}>
                            Show More
                        </Button>
                    </div>
                }
                
            </div>
        );
    }
}

FriendsList.propTypes = {
    list: PropTypes.array.isRequired,
};





export default withStyles(styles)(FriendsList);