import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateCourseInstructor, startUpdateCourseInstructor } from '../../actions/courses';
import { useForm } from '../../hooks/useForm';
import { CourseSelect } from '../courses/CourseSelect';

const initialForm = {
    ID: 0,
    CourseID: '',
    InstructorID: ''
};

export const InstructorCoursesForm = ({ InstructorID }) => {
    const dispatch = useDispatch();
    const active = useSelector( state => state.data.secondDataActive );
    const newActive = ( active ) && active.hasOwnProperty('ID') ? active : initialForm;
    const [ { ID, CourseID }, handleInputChange, setFormValues ]  = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        if ( !ID ) {
            dispatch( startCreateCourseInstructor( { ID, CourseID, InstructorID } ) );
            return;
        }

        dispatch( startUpdateCourseInstructor( { ID, CourseID, InstructorID } ) );
    }
    
    useEffect( () => {
        setFormValues( ( values ) => ( { ...values, ...newActive } ) );
    }, [ setFormValues, active, newActive ])
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
