import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect  } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser._id;
  return (
    <Route
      {...rest}
      render={() =>
        !isLoggedIn ? (
          <Redirect  to="/login" />
        ) : (
          <>{children}</>
        )
      }
    />
  );
};

export default PrivateRoute;
