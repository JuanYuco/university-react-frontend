import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={ <AuthRouter /> } />
                <Route path="/*" element={ <WelcomeScreen /> } />
            </Routes> 
        </BrowserRouter>
    )
}
