import React from "react";
import { Route, Redirect } from "react-router-dom";


class UserRoute extends React.Component {

  render() {
    const {
      component: Component,
      pending,
      isLoggedIn,
      redirect = "/auth/login",
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          if (pending) return <div>Loading...</div>;
          return isLoggedIn ? (
            <Component {...props} {...this.props} />
          ) : (
            <Redirect to={redirect} />
          );
        }}
      />
    );
  }
}

export default UserRoute;
