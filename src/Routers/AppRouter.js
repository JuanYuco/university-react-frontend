import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { startValidate } from '../actions/auth';
import { AuthRouter } from './AuthRouter';
import { DashBoardRouter } from './DashBoardRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { id, validate } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startValidate() );
    }, [dispatch]);

    if ( !validate ) return <h1>Wait...</h1>;
    
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
