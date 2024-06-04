import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/Context';


const PrivateRoute = () => {
    const { isAuthenticated } =useAuth()
    return isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoute;
