import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startGetCourses } from '../../actions/courses';
import { TableRender } from '../table/TableRender';

export const CoursesScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch( startGetCourses() );
    }, [ dispatch ]);

    const properties = [
        { title: 'Id', name: 'CourseID' },
        { title: 'Title', name: 'Title' },
        { title: 'Credits', name: 'Credits' }
    ];

    const state = 'courses';

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableRender properties={ properties } stateName={ state } subState={ state } dif="CourseID" />
            </div>
        </div>
    )
}
