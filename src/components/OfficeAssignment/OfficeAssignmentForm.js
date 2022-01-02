import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInstructors } from '../../helpers/Instructors';
import { useForm } from '../../hooks/useForm';

const initialForm = {
    InstructorID: 0,
    Location: ''
}

export const OfficeAssignmentForm = () => {
    const [ instructors, setInstructors ] = useState( [] );
    const active = useSelector( state => state.data.active );
    const newActive = active.hasOwnProperty('InstructorID') ? active : initialForm;
    const [ { InstructorID, Location }, handleInputChange, setFormValues ] = useForm( newActive );
    useEffect( () => {
        console.log('Carga');
        (async () => {
            const { data } = await getInstructors();
            setInstructors( data );
        })()
    }, [ setInstructors ]);

    useEffect( () =>  {
        setFormValues( value => ({ ...value, ...newActive }) );
    }, [ newActive, setFormValues ]);

    return (
        <form>
            <h6 className="mb-0">Instructor</h6>
            <select
                className="form-control mb-1"
                name="ID"
                value={ InstructorID }
                onChange={ handleInputChange }
            >
                <option value={ 0 }>Seleccione un Instructor</option>
                {
                    instructors.map( ( { ID, FirstMidName, LastName } ) => (
                        <option key={ `opIn${ ID }` } value={ ID }>{ `${ FirstMidName } ${ LastName }` }</option>
                    ))
                }
            </select>
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
