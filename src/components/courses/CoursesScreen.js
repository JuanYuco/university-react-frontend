import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startGetCourses } from '../../actions/courses';
import { CoursesTable } from './CoursesTable';

export const CoursesScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch( startGetCourses() );
    }, [ dispatch ])
    return (
        <div className="col-md-6">
            <CoursesTable />
        </div>
    )
}
