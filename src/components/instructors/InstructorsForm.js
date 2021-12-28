import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export const InstructorsForm = () => {
    const active = useSelector( state => state.instructors.active );
    const [ { ID, FirstMidName, LastName, HireDate }, handleInputChange, setFormValues ] = useForm( active );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        if ( !ID ) {
            console.log('Create Instructor');
            return;
        }

        console.log( 'Update Instructor' );
    }

    useEffect( () => { 
        setFormValues( ( values ) => ({ ...values, ...active }) );
    }, [ setFormValues, active ]);

    return (
        <form onSubmit={ handleSubmit }>
            <h2>Crear Instructor</h2>
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
