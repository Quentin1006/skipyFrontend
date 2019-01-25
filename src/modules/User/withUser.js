import React from 'react';

import { connect } from "react-redux";
//import { compose } from "redux";

import { 
    checkIfUserIsConnected ,
    logout
} from "../../actions/userprofile";




const withUser = ComponentToWrap => {
    return ({isLoggedIn, profile, ...props}) => {
        return (
            <ComponentToWrap 
                isLoggedIn={isLoggedIn} 
                profile={profile} 
                {...props}
            />
        );
    };
};

const mapStateToProps = (state) => {
    const { isLoggedIn, profile } = state.userprofile;
    return {
        isLoggedIn,
        profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkIfUserIsConnected: () => dispatch(checkIfUserIsConnected()),
        logout: () => dispatch(logout())
    }
}


export default (Component) => (
    connect(mapStateToProps, mapDispatchToProps)(withUser(Component))
);

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withUser
// );
