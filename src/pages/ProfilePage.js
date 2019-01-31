import React, { Component } from 'react';
import { connect } from "react-redux";
import Profile from "../modules/Profile"

import { update_user, get_user_friends } from "../actions/userprofile";


const mapStateToProps = (state, ownProps) => {
    const { profile, friendlist } = state.userprofile;

    return {
        profile,
        friendlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (fields) => dispatch(update_user(fields)),
        getUserFriends: () => dispatch(get_user_friends()),
    }
}

class ProfilePage extends Component {
    componentDidMount(){
        const { profile, getUserFriends } = this.props;
        profile.id && getUserFriends();        
    }


    getFriends = (filter="") => {
        const { friendlist } = this.props;
        filter = filter.toLowerCase();
    
        return friendlist.filter(f => {
            const fullname = `${f.firstname} ${f.lastname}`.toLowerCase();
            return fullname.includes(filter);
        })
    }

    render(){
        const { profile, updateUser } = this.props;
        return (
            <Profile 
                userprofile={profile}
                getFriends={this.getFriends}
                updateUser={updateUser}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);