import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import SearchFriend from './FriendsUser/SearchFriend';
import FriendsList from './FriendsUser/FriendsList';


const styles = theme => ({
})

class FriendsUser extends Component {

    state= {
        matchedFriends: this.props.getFriends(),
        nbToDisplay: this.props.maxToDisplay,
        search:""
    }


    increaseNbDisplayed = () => {
        const {maxToDisplay} = this.props
        this.setState(prevState => {
            const nbToDisplay = prevState.nbToDisplay + maxToDisplay;
            return {
                ...prevState, 
                nbToDisplay
            }
        })
    }


    updateFriendsFilter = filter => {
        const { getFriends, maxToDisplay } = this.props;
        const matchedFriends = getFriends(filter);
        this.setState({matchedFriends, nbToDisplay: maxToDisplay});
    }

    render() {
        const { classes } = this.props;
        const { matchedFriends, nbToDisplay  } = this.state;

        return (
            <div className={classes.container}>
                <div>
                    <SearchFriend 
                        onHandleChange={this.updateFriendsFilter}
                    />

                    <FriendsList 
                        list={matchedFriends}
                        nbToDisplay={nbToDisplay}
                        increaseNbDisplayed={this.increaseNbDisplayed}
                    />
                </div>
                
            </div>
        );
    }
}

FriendsUser.propTypes = {
    getFriends: PropTypes.func.isRequired,
    maxToDisplay: PropTypes.number
};


FriendsUser.defaultProps = {
    maxToDisplay: 10 
};


export default withStyles(styles)(FriendsUser);