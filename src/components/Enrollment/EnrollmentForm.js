import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { CourseSelect } from '../courses/CourseSelect';

const initialForm = {
    EnrollmentID: 0,
    StudentID: '',
    CourseID: '',
    Grade: ''
};
export const EnrollmentForm = () => {
    const { active } = useSelector( state => state.data );
    const newActive = active.hasOwnProperty('EnrollmentID') ? active : initialForm;
    const [ { CourseID, Grade }, handleInputChange, setFormValues ] = useForm( newActive );

    useEffect( () => {
        setFormValues( value => ({ ...value, ...newActive }) );
    }, [ newActive, setFormValues ]);
    return (
        <form>
            <h3>Create Enrollment</h3>
            <h6 className="mb-0">Student</h6>
            <CourseSelect
                value={ CourseID }
                handleInputChange={ handleInputChange }
            />
            <h6 className="mb-0">Grade</h6>
            <input
                className="form-control"
                value={ Grade }
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
