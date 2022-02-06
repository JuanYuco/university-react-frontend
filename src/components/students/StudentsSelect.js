import React, { useCallback, useEffect, useState } from 'react';
import { getStudents } from '../../helpers/Students';
import { Select } from '../ui/Select';

export const StudentsSelect = ( { value, handleInputChange } ) => {
    const [ students, setStudents ] = useState( [] );
    const getStudentsCallback = useCallback( async () => {
        const { data } = await getStudents();
        setStudents( data.map( student => ({
            val: student.ID,
            name: `${ student.FirstMidName } ${ student.LastName }`
        })));
    }, [ setStudents ]);

    useEffect( () => {
        getStudentsCallback();
    }, [ getStudentsCallback ]);

    return (
        <Select
            data={ students }
            pref="st"
            name="StudentID"
            value={ value }
            handleInputChange={ handleInputChange }
        />
    );
};
