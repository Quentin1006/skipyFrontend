import React, { Component } from 'react';
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";

import { Redirect } from "react-router";


import { login_user } from "../../actions/userprofile";

import server from "../../config/server";

import "./Login.css";

const facebookAppId = server.facebook.appId;


class Login extends Component {

    responseFacebook = (response) => {
        const { loginUser } = this.props;
        const {provider} = server.facebook;
        const auth_type = "token";
        loginUser(response.accessToken, provider, auth_type);
        
        return (
            <Redirect to={{pathname:"/home"}}/>
        )
    }

    componentClicked = () => {
        console.log("clicked");
    }

    render() {
        return (
            <div className="login__wrapper">
                <FacebookLogin
                    appId={facebookAppId}
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (token, provider, type) => dispatch(login_user(token, provider, type))
    }
}

export default connect(null, mapDispatchToProps)(Login);