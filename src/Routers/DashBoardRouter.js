import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CoursesScreen } from '../components/courses/CoursesScreen';
import { DepartmentScreen } from '../components/departments/DepartmentScreen';
import { InstructorsScreen } from '../components/instructors/InstructorsScreen';
import { OfficeAssignmentScreen } from '../components/OfficeAssignment/OfficeAssignmentScreen';
import { StudentsScreen } from '../components/students/StudentsScreen';
import { NavBar } from '../components/ui/NavBar';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';

export const DashBoardRouter = () => {
    return (
        <>
        <NavBar />
            <Routes>
                <Route path="/courses" element={ <CoursesScreen /> } />
                <Route path="/Instructors" element={ <InstructorsScreen /> } />
                <Route path="/Students" element={ <StudentsScreen /> } />
                <Route path="/OfficesAssignment" element={ <OfficeAssignmentScreen /> } />
                <Route path="/Departments" element={ <DepartmentScreen /> } />
                <Route path="*" element={ <WelcomeScreen /> } />
            </Routes>
        </>
    )
}
