import React, { Component } from 'react';

import { connect } from "react-redux";
//import { compose } from "redux";

import { 
    checkIfUserIsConnected ,
    logout
} from "../../actions/userprofile";




const withUser = ComponentToWrap => {
    return class extends Component{
        componentDidMount(){
            const { checkIfUserIsConnected } = this.props;
            checkIfUserIsConnected()
        }

        // componentDidUpdate(prevProps){
        //     const { checkIfUserIsConnected, isLoggedIn } = this.props;

        //     if(prevProps.isLoggedIn !== isLoggedIn){
        //         checkIfUserIsConnected()
        //     }
                
        // }

        render(){
            const { isLoggedIn, profile } = this.props
            return (
            <ComponentToWrap
                {...this.props} 
                isLoggedIn={isLoggedIn} 
                profile={profile} 
                
            />
        );
        }
    } 
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
