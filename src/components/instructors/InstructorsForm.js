import React from 'react';
import { startCreateInstructors, startUpdateInstructors } from '../../actions/instructors';
import { useFormSubmit } from '../../hooks/useFormSubmit';

const initialForm = {
    ID: 0,
    LastName: '',
    FirstMidName: '',
    HireDate: ''
};

export const InstructorsForm = () => {
    const [ { ID, FirstMidName, LastName, HireDate }, handleInputChange, handleSubmit ] = useFormSubmit( 'ID', 'active', initialForm, startCreateInstructors, startUpdateInstructors );
    const titulo = ( ID ) ? 'Update' : 'Create';

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
