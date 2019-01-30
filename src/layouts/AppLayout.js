import React from "react";

import { Route, Switch, withRouter } from "react-router-dom";

import Home from "../pages/Home";
import MessengerPage from "../pages/Messenger";
import ProfilePage from "../pages/ProfilePage"

const AppLayout = ({ match }) => {

    return (
        <Switch>
            <Route exact path={`${match.path}`} component={Home} />
            <Route exact path={`${match.path}/messenger`} render={() => <MessengerPage />} />
            <Route exact path={`${match.path}/profile`} render={() => <ProfilePage />} />
            <Route render={() => <h1>Not Found in App</h1>} />
        </Switch>
    );
};

export default withRouter(AppLayout);