import React from 'react';
import { startCreateCourseInstructor, startUpdateCourseInstructor } from '../../actions/courses';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { InstructorSelect } from '../instructors/InstructorSelect';

const initialForm = {
    ID: 0,
    CourseID: '',
    InstructorID: ''
};

export const CourseInstructorsForm = ({ CourseID }) => {
    const [ { InstructorID }, handleInputChange, handleSubmit ] = useFormSubmit( 'ID', 'secondDataActive', initialForm, startCreateCourseInstructor, startUpdateCourseInstructor, { CourseID } );

    return (
        <form onSubmit={ handleSubmit }>
            <h3>Create Course Instructor</h3>
            <h6 className="mb-0">Instructor</h6>
            <InstructorSelect
                value={ InstructorID }
                handleInputChange={ handleInputChange }
            />
            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                Save
            </button>
        </form>
    )
}
