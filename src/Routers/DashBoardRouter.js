import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { resetData } from '../actions/data';
import { CoursesScreen } from '../components/courses/CoursesScreen';
import { InstructosScreen } from '../components/instructors/InstructosScreen';
import { StudentsScreen } from '../components/students/StudentsScreen';
import { NavBar } from '../components/ui/NavBar';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';

export const DashBoardRouter = () => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch( resetData() );
    }, [ dispatch, pathname ])
    return (
        <>
        <NavBar />
            <Routes>
                <Route path="/courses" element={ <CoursesScreen /> } />
                <Route path="/Instructors" element={ <InstructosScreen /> } />
                <Route path="/Students" element={ <StudentsScreen /> } />
                <Route path="*" element={ <WelcomeScreen /> } />
            </Routes>
        </>
    )
}
