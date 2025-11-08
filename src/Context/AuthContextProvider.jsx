import React from 'react';
import { AuthContext } from './AuthContext';

const AuthContextProvider = ({children}) => {


    const authInfo = {

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthContextProvider;