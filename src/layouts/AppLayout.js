import React from "react";

import { Route, Switch, withRouter } from "react-router-dom";

import Home from "../pages/Home";
import Messenger from "../pages/Messenger";
//import ProfileLayout from "../layouts/AppLayout/ProfileLayout";

const AppLayout = ({ match }) => {

    return (
        <Switch>
            <Route exact path={`${match.path}`} component={Home} />
            <Route exact path={`${match.path}/messenger`} render={() => <Messenger />} />
            <Route exact path={`${match.path}/profile`} render={() => <h1>Profile Page still under construction</h1>} />
            <Route render={() => <h1>Not Found in App</h1>} />
        </Switch>
    );
};

export default withRouter(AppLayout);