import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateInstructors, startUpdateInstructors } from '../../actions/instructors';
import { useForm } from '../../hooks/useForm';

const initialForm = {
    ID: '',
    LastName: '',
    FirstMidName: '',
    HireDate: ''
};

export const InstructorsForm = () => {
    const dispatch = useDispatch();
    const active = useSelector( state => state.data.active );
    const newActive = active.hasOwnProperty('ID') ? active : initialForm;
    const [ { ID, FirstMidName, LastName, HireDate }, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        if ( !ID ) {
            dispatch( startCreateInstructors( { FirstMidName, LastName, HireDate } ) );
            return;
        }

        dispatch( startUpdateInstructors( { ID, FirstMidName, LastName, HireDate } ) );
    }

    useEffect( () => { 
        setFormValues( ( values ) => ({ ...values, ...newActive }) );
    }, [ setFormValues, newActive ]);

    const titulo = ( active.ID ) ? 'Update' : 'Create';

    return (
        <form onSubmit={ handleSubmit }>
            <h2>{ titulo } Instructor</h2>
            <h6 className="mb-0">First Mid Name</h6>
            <input
                name="FirstMidName"
                type="text"
                className="form-control mb-1"
                placeholder="First Mid Name"
                value={ FirstMidName }
                onChange={ handleInputChange }
                required
            />
            <h6 className="mb-0">Last Name</h6>
            <input
                name="LastName"
                type="text"
                className="form-control mb-1"
                placeholder="Last Name"
                value={ LastName }
                onChange={ handleInputChange }
                required
            />
            <h6 className="mb-0">Hire Date</h6>
            <input
                name="HireDate"
                type="datetime-local"
                className="form-control mb-1"
                value={ HireDate }
                onChange={ handleInputChange }
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
