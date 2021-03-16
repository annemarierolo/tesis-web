import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    const m = localStorage.getItem('token') ? true : false;
    return(
        <Route {...rest} render={(props) => (
            (m === true)
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
}

export default GuardedRoute;