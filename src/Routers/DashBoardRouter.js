import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CoursesScreen } from '../components/courses/CoursesScreen';
import { InstructosScreen } from '../components/instructors/InstructosScreen';
import { NavBar } from '../components/ui/NavBar';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';

export const DashBoardRouter = () => {
    return (
        <>
        <NavBar />
            <Routes>
                <Route path="/courses" element={ <CoursesScreen /> } />
                <Route path="/Instructors" element={ <InstructosScreen /> } />
                <Route path="*" element={ <WelcomeScreen /> } />
            </Routes>
        </>
    )
}
