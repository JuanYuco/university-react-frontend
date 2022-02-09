import React from 'react';
import { startCreateStudent, startUpdateStudent } from '../../actions/students';
import { useFormSubmit } from '../../hooks/useFormSubmit';

const initialForm = {
    ID: 0,
    FirstMidName: '',
    LastName: '',
    EnrollmentDate: ''
};

export const StudentsForm = () => {
    const [ { ID, FirstMidName, LastName, EnrollmentDate }, handleInputChange, handleSubmit ] = useFormSubmit( 
        'ID',
        'active',
        initialForm,
        startCreateStudent,
        startUpdateStudent
    );

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
