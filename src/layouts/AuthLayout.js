import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";

import Login from "../modules/Login/Login";

const AuthLayout = () => {
    return (
        <Switch>
            <Route
                exact
                path="/auth/login"
                render={() => <Login />}
            />
            <Redirect to="/auth/login" />
        </Switch>
    );
};


export default AuthLayout;