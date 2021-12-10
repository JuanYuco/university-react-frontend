import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { RegisterScreen } from '../components/Register/RegisterScreen';
import { AuthHeader } from '../components/ui/AuthHeader';

export const AuthRouter = () => {
    return (
        <>
            <AuthHeader />
            <Routes>
                <Route path="/login" element={ <LoginScreen /> } />
                <Route path="/register" element={ <RegisterScreen /> } />
            </Routes>
        </>
    )
}
