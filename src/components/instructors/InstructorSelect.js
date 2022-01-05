import React, { useCallback, useEffect, useState } from 'react';
import { getInstructors } from '../../helpers/Instructors';
import { Select } from '../ui/Select';

export const InstructorSelect = ({ value, handleInputChange }) => {
    const [ instructores, setInstructores ] = useState( [] );

    const getInstructores = useCallback( async () => {
        const { data } = await getInstructors();
        setInstructores( data.map( ins => ({
            val: ins.ID,
            name: `${ ins.FirstMidName } ${ ins.LastName }`
        })) );
    }, [ setInstructores ]);

    useEffect( () => {
        getInstructores();
    }, [ getInstructores ]);

    return (
        <Select
            data={ instructores }
            pref="Ins"
            name="InstructorID"
            value={ value }
            handleInputChange={ handleInputChange }
        />
    )
}
