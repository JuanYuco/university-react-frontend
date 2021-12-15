import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { DashBoardRouter } from './DashBoardRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const { id } = useSelector( state => state.auth );
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={ 
                        <PublicRoute userId={ id } >
                            <AuthRouter />    
                        </PublicRoute>
                    } 
                />
                <Route path="/*" element={
                    <PrivateRoute  userId={ id } >
                        <DashBoardRouter />
                    </PrivateRoute> 
                } />
            </Routes> 
        </BrowserRouter>
    )
}
