import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from '../components/ui/NavBar';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';

export const DashBoardRouter = () => {
    return (
        <>
        <NavBar />
            <Routes>
                <Route path="*" element={ <WelcomeScreen /> } />
            </Routes>
        </>
    )
}
