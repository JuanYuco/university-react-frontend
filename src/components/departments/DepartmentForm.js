import React from 'react';
import { startCreateDepartment, startUpdateDepartment } from '../../actions/departments';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { InstructorSelect } from '../instructors/InstructorSelect';

const initialForm = {
    DepartmentID: 0,
    Name: '',
    Budget: '',
    StartDate: '',
    InstructorID: ''
}
export const DepartmentForm = () => {
    const [ { Name, Budget, StartDate, InstructorID }, handleInputChange, handleSubmit ] = useFormSubmit( 'DepartmentID', 'active', initialForm, startCreateDepartment, startUpdateDepartment );

    return (
        <form onSubmit={ handleSubmit }>
            <h3>Department Form</h3>
            <h6 className="mb-0">Name</h6>
            <input
                type="text"
                className="form-control mb-1"
                placeholder="Name"
                name="Name"
                value={ Name }
                onChange={ handleInputChange }
            />
            <h6 className="mb-0">Budget</h6>
            <input
                type="number"
                className="form-control mb-1"
                placeholder="Budget"
                name="Budget"
                value={ Budget }
                onChange={ handleInputChange }
            />
            <h6 className="mb-0">Start Date</h6>
            <input
                type="datetime-local"
                className="form-control mb-1"
                placeholder="Start Date"
                name="StartDate"
                value={ StartDate }
                onChange={ handleInputChange }
            />
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
