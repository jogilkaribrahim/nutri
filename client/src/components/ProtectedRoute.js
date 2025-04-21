import React from 'react';
import {Navigate, Route} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = localStorage.getItem('token'); // Check if token exists

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login"/>
                )
            }
        />
    );
};

export default ProtectedRoute;
