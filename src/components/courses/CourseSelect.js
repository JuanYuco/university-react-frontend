import React, { useCallback, useEffect, useState } from 'react';
import { getCourses } from '../../helpers/Courses';
import { Select } from '../ui/Select';

export const CourseSelect = ({ value, handleInputChange }) => {
    const [ courses, setCourses ] = useState( [] );
    const getCoursesCallback = useCallback( async () => {
        const { data } = await getCourses();
        setCourses( data.map( cor => ({
            val: cor.CourseID,
            name: cor.Title
        })) )
    }, [ setCourses ]);

    useEffect( () => { 
        getCoursesCallback();
    }, [ getCoursesCallback ]);

    return (
        <Select
            data={ courses }
            pref="Cou"
            name="CourseID"
            value={ value }
            handleInputChange={ handleInputChange }
        />
    )
};
