import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
function ProtectedRoute({ component: Component, ...rest }) {
  const authState = useSelector((state) => state.auth);
  //console.log(authState);
  const { isAuthenticated } = authState;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <React.Fragment>
            <Header />
            <Component {...rest} {...props} />
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
