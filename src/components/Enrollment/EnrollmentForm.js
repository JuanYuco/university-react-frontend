import React from 'react';
import { startCreateEnrollment, startUpdateEnrollment } from '../../actions/Enrollment';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { CourseSelect } from '../courses/CourseSelect';
import { StudentsSelect } from '../students/StudentsSelect';

const initialForm = {
    EnrollmentID: 0,
    StudentID: '',
    CourseID: '',
    Grade: ''
};
export const EnrollmentForm = () => {
    const [ { CourseID, Grade, StudentID }, handleInputChange, handleSubmit ] = useFormSubmit( 'EnrollmentID', 'active', initialForm, startCreateEnrollment, startUpdateEnrollment );

    return (
        <form onSubmit={ handleSubmit }>
            <h3>Enrollment Form</h3>
            <h6 className="mb-0">Course</h6>
            <CourseSelect
                value={ CourseID }
                handleInputChange={ handleInputChange }
            />
            <h6>Student</h6>
            <StudentsSelect
                value={ StudentID }
                handleInputChange={ handleInputChange }
            />
            <h6 className="mb-0">Grade</h6>
            <input
                className="form-control"
                value={ Grade }
                name="Grade"
                onChange={ handleInputChange }
                placeholder="Grade" 
            />
            <button
                type="submit"
                className="btn btn-primary w-100 mt-1"
            >
                Save
            </button>
        </form>
    );
};
