import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Route {...rest}>
            {isAuthenticated ? (
                children
            ) : (
                <Redirect to="/register-info" />
            )}
        </Route>
    );
};

export default ProtectedRoute;
