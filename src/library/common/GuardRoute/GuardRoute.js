import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, roles, ...rest }) => {
    const m = localStorage.getItem('token') ? true : false;
    const user = JSON.parse(localStorage.getItem('user'))
    return(
        <Route {...rest} render={(props) => (
            (m === true && (roles.includes(user?.role)))
                ? <Component {...props} />
                : <Redirect to='/notfound' />
        )} />
    )
}

export default GuardedRoute;