import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetCourseInstructor } from '../../actions/courses';
import { TableStart } from '../table/TableStart';

export const CourseInstructors = () => {
    const { active, secondData, secondLoading } = useSelector( state => state.data );
    const { CourseID } = active;
    const dispatch = useDispatch();

    useEffect( () => {
        if ( CourseID ) {
            dispatch( startGetCourseInstructor( CourseID ) );
        }
    }, [ dispatch, CourseID ]);

    const parameters = {
        properties: [
            { title: 'Id', name: 'ID' },
            { title: 'Intructor', name: 'Instructor' }
        ],
        data: secondData || [],
        loading: secondLoading || false,
        key:'ID',
        dif: 'CoursesInstructor'
    };
    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableStart  parameters={ parameters } />
            </div>
        </div>
    )
}
