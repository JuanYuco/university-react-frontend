import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateCourseInstructor, startUpdateCourseInstructor } from '../../actions/courses';
import { useForm } from '../../hooks/useForm';
import { InstructorSelect } from '../instructors/InstructorSelect';

const initialForm = {
    ID: 0,
    CourseID: '',
    InstructorID: ''
};

export const CourseInstructorsForm = ({ CourseID }) => {
    const dispatch = useDispatch();
    const active = useSelector( state => state.data.secondDataActive );
    const newActive = ( active ) && active.hasOwnProperty('ID') ? active : initialForm;
    const [ { ID, InstructorID }, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        if ( ID ) {
            dispatch( startUpdateCourseInstructor( { ID, CourseID, InstructorID } ) );
            return;
        }

        dispatch( startCreateCourseInstructor( { ID, CourseID, InstructorID } ) );
    }

    useEffect( () => {
        setFormValues( ( values ) => ({ ...values, ...newActive }) );
    }, [ setFormValues, active, newActive ]);

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
