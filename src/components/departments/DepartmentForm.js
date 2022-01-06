import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateDepartment, startUpdateDepartment } from '../../actions/departments';
import { useForm } from '../../hooks/useForm';
import { InstructorSelect } from '../instructors/InstructorSelect';

const initialForm = {
    DepartmentID: '',
    Name: '',
    Budget: '',
    StartDate: '',
    InstructorID: ''
}
export const DepartmentForm = () => {
    const dispatch = useDispatch();
    const active = useSelector( state => state.data.active );
    const newActive = active.hasOwnProperty('DepartmentID') ? active : initialForm;
    const [ { DepartmentID, Name, Budget, StartDate, InstructorID }, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if ( !DepartmentID ) {
            dispatch( startCreateDepartment( { Name, Budget, StartDate, InstructorID } ) );
            return;
        }

        dispatch( startUpdateDepartment( { DepartmentID, Name, Budget, StartDate, InstructorID } ) );
    }

    useEffect( () => {
        setFormValues( newActive );
    }, [ setFormValues, newActive ]);

    const title = ( active.DepartmentID ) ? 'Update' : 'Create';
    return (
        <form onSubmit={ handleSubmit }>
            <h3>{ title } Department</h3>
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
