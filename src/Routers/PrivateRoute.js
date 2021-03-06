import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, userId }) => {
    return userId ? children : <Navigate to="/auth/login" />;
}
