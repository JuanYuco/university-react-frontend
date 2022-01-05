import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateOfficesAssignment, startUpdateOfficesAssignment } from '../../actions/officesAssignment';
import { useForm } from '../../hooks/useForm';
import { InstructorSelect } from '../instructors/InstructorSelect';

const initialForm = {
    InstructorID: 0,
    Location: ''
}

export const OfficeAssignmentForm = () => {
    const dispatch = useDispatch();
    const active = useSelector( state => state.data.active );
    const newActive = active.hasOwnProperty('InstructorID') ? active : initialForm;
    const [ { InstructorID, Location }, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();
        
        if ( !active.InstructorID ) {
            dispatch( startCreateOfficesAssignment( { InstructorID, Location } ) );
            return;
        }

        dispatch( startUpdateOfficesAssignment( { InstructorID, Location } ) );
    }

    useEffect( () =>  {
        setFormValues( value => ({ ...value, ...newActive }) );
    }, [ newActive, setFormValues ]);

    return (
        <form onSubmit={ handleSubmit }>
            <h6 className="mb-0">Instructor</h6>
            <InstructorSelect
                value={ InstructorID }
                handleInputChange={ handleInputChange }
            />
            <h6 className="mb-0">Location</h6>
            <input
                type="text"
                className="form-control mb-1"
                name="Location"
                value={ Location }
                onChange={ handleInputChange }
            />
            <button
                className="btn btn-primary"
            >
                Save
            </button>
        </form>
    )
}
