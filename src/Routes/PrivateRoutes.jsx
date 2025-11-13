import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoutes = ({children}) => {
    const {user, loading } = use(AuthContext);
    const location = useLocation();
    // console.log(location);

    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to={'/login'}></Navigate>
};

export default PrivateRoutes;