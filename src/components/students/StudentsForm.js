import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateStudent, startUpdateStudent } from '../../actions/students';
import { useForm } from '../../hooks/useForm';

const initialForm = {
    ID: '',
    FirstMidName: '',
    LastName: '',
    EnrollmentDate: ''
};

export const StudentsForm = () => {
    const dispatch = useDispatch();
    const active = useSelector( state => state.data.active );
    const newActive = ( active.hasOwnProperty( 'ID' ) ) ? active : initialForm;
    const [ { ID, FirstMidName, LastName, EnrollmentDate }, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if ( !ID ) {
            dispatch( startCreateStudent( { FirstMidName, LastName, EnrollmentDate } ) );
            return;
        }

        dispatch( startUpdateStudent( { ID, FirstMidName, LastName, EnrollmentDate } ) );
    }

    useEffect( () => {
        setFormValues( ( values ) => ({ ...values, ...newActive }) );
    }, [ newActive, setFormValues ]);

    const title = ( ID ) ? 'Update' : 'Create';
    return (
        <form onSubmit={ handleSubmit }>
            <h2>{ title } Student</h2>
            <h6 className="mb-0">First Mid Name</h6>
            <input
                type="text"
                className="form-control mb-1"
                placeholder="First Mid Name"
                name="FirstMidName"
                value={ FirstMidName }
                onChange={ handleInputChange }
                required
            />
            <h6 className="mb-0">LastName</h6>
            <input
                type="text"
                className="form-control mb-1"
                placeholder="Last Name"
                name="LastName"
                value={ LastName }
                onChange={ handleInputChange }
                required
            />
            <h6 className="mb-0">Enrollment Date</h6>
            <input
                type="datetime-local"
                className="form-control mb-1"
                name="EnrollmentDate"
                value={ EnrollmentDate }
                onChange={ handleInputChange }
            />
            <button type="submit" className="btn btn-primary w-100">
                Save
            </button>
        </form>
    )
}
