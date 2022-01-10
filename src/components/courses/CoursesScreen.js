import React from 'react'
import { CourseInstructors } from './CourseInstructors';
import { CoursesTable } from './CoursesTable'

export const CoursesScreen = () => {
    return (
        <>
            <div className="m-3">
                <h1>Courses</h1>
            </div>
            <CoursesTable />
            <CourseInstructors />
        </>
    )
}
