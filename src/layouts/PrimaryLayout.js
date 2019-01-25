import React, { Fragment } from 'react';

import {Route, Switch, Redirect, withRouter } from "react-router-dom";

import UserRoute from "./utils";
import withUser from "../modules/User/withUser";

import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";


import MenuNavbar from "../components/MenuNavbar";


const PrimaryLayout = ({ isLoggedIn, profile, logout }) => {
    const loginPath = "/auth/login";

    return (
      <Fragment>
        <Route path="/" render={() => <MenuNavbar logout={logout} isLoggedIn={isLoggedIn}/>} />
        <Switch>
            <UserRoute path="/app" component={AppLayout} isLoggedIn={isLoggedIn} redirect={loginPath} />
            
            {
                isLoggedIn 
                ? <Redirect to="/app"/>
                : <Route
                    path="/auth"
                    render={() => <AuthLayout isLoggedIn={isLoggedIn}/>}
                />
            }
          
            <Route render={() => <h1>Not Found</h1>}/>
        </Switch>
      </Fragment>
    );
  };

export default withRouter(withUser(PrimaryLayout));