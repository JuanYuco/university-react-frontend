import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateEnrollment, startUpdateEnrollment } from '../../actions/Enrollment';
import { useForm } from '../../hooks/useForm';
import { CourseSelect } from '../courses/CourseSelect';
import { StudentsSelect } from '../students/StudentsSelect';

const initialForm = {
    EnrollmentID: 0,
    StudentID: '',
    CourseID: '',
    Grade: ''
};
export const EnrollmentForm = () => {
    const dispatch = useDispatch();
    const { active } = useSelector( state => state.data );
    const newActive = active.hasOwnProperty('EnrollmentID') ? active : initialForm;
    const [ { EnrollmentID, CourseID, Grade, StudentID }, handleInputChange, setFormValues ] = useForm( newActive );

    useEffect( () => {
        setFormValues( value => ({ ...value, ...newActive }) );
    }, [ newActive, setFormValues ]);

    const handleSubmit = ( e ) => {
        e.preventDefault();

        const enrollment = { EnrollmentID, CourseID, StudentID, Grade };
        if ( !EnrollmentID ) {
            dispatch( startCreateEnrollment( enrollment ) );
            return;
        }

        dispatch( startUpdateEnrollment( enrollment ) );
    }

    return (
        <form onSubmit={ handleSubmit }>
            <h3>Create Enrollment</h3>
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
