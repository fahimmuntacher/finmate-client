import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user} = useContext(AuthContext)
    if(user){
        return children;
    }

    return <Navigate state={location?.pathname} to="/register"></Navigate>

};

export default PrivateRoute;