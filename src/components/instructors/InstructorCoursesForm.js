import React from 'react';
import { startCreateCourseInstructor, startUpdateCourseInstructor } from '../../actions/courses';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { CourseSelect } from '../courses/CourseSelect';

const initialForm = {
    ID: 0,
    CourseID: '',
    InstructorID: ''
};

export const InstructorCoursesForm = ({ InstructorID }) => {
    const [ { CourseID }, handleInputChange, handleSubmit ] = useFormSubmit( 'ID', 'secondDataActive', initialForm, startCreateCourseInstructor, startUpdateCourseInstructor, { InstructorID } );

    return (
        <form onSubmit={ handleSubmit }>
            <h3>Create Course for Instrutor</h3>
            <h6 className="mb-0">Course</h6>
            <CourseSelect
                value={ CourseID }
                handleInputChange={ handleInputChange }
            />
            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                Save
            </button>
        </form>
    );
};
