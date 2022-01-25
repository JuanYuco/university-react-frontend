import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetCourseInstructor } from '../../actions/courses';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { TableStart } from '../table/TableStart';
import { CourseInstructorsForm } from './CourseInstructorsForm';

const propertieName = 'secondDataActive';
export const CourseInstructors = () => {
    const { active, secondData, secondLoading } = useSelector( state => state.data );
    const { CourseID } = active;
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( courseInstructor ) => {
        dispatch( setActiveData( courseInstructor, propertieName ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData( propertieName ) );
    }, [ dispatch ]);

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
        dif: 'CoursesInstructor',
        update: setActiveUpdate,
        create: setActiveCreate
    };
    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableStart  parameters={ parameters } />
            </div>
            <div className="col-6">
                <CourseInstructorsForm CourseID={ CourseID }/>
            </div>
        </div>
    )
}
