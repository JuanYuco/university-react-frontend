import React from 'react';
import { InstructorCourses } from './InstructorCourses';
import { InstructorsTable } from './InstructorsTable';

export const InstructorsScreen = () => {
    return (
        <>
            <div className="m-3">
                <h1>Instructors</h1>
            </div>
            <InstructorsTable />
            <InstructorCourses />
        </>
    )
}
