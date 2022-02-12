import React from 'react';
import { startCreateOfficesAssignment, startUpdateOfficesAssignment } from '../../actions/officesAssignment';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { InstructorSelect } from '../instructors/InstructorSelect';

const initialForm = {
    InstructorID: 0,
    Location: ''
}

export const OfficeAssignmentForm = () => {
    const [ { InstructorID, Location }, handleInputChange, handleSubmit ] = useFormSubmit( 'InstructorID', 'active', initialForm, startCreateOfficesAssignment, startUpdateOfficesAssignment );

    return (
        <form onSubmit={ handleSubmit }>
            <h3>Offices Form</h3>
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
