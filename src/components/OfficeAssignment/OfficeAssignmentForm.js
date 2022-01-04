import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInstructors } from '../../helpers/Instructors';
import { useForm } from '../../hooks/useForm';
import { Select } from '../ui/Select';

const initialForm = {
    InstructorID: 0,
    Location: ''
}

export const OfficeAssignmentForm = () => {
    const [ instructors, setInstructors ] = useState( [] );
    const active = useSelector( state => state.data.active );
    const newActive = active.hasOwnProperty('InstructorID') ? active : initialForm;
    const [ { InstructorID, Location }, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSelectChange = useCallback( ( e ) => {
        handleInputChange( e );
    }, [ handleInputChange ]);

    useEffect( () => {
        (async () => {
            const { data } = await getInstructors();
            setInstructors( data.map( ins => ({
                val: ins.ID,
                name: `${ ins.FirstMidName } ${ ins.LastName }`
            })) );
        })()
    }, [ setInstructors ]);

    useEffect( () =>  {
        setFormValues( value => ({ ...value, ...newActive }) );
    }, [ newActive, setFormValues ]);

    return (
        <form>
            <h6 className="mb-0">Instructor</h6>
            <Select
                data={ instructors }
                pref="Ins"
                name="InstructorID"
                value={ InstructorID }
                handleInputChange={ handleSelectChange }
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
