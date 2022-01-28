import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetInstructorCourses } from '../../actions/instructors';
import { TableStart } from '../table/TableStart';

export const InstructorCourses = () => {
    const { active, secondData, secondLoading } = useSelector( state => state.data );
    const { ID } = active;
    const dispatch = useDispatch();

    useEffect( () => {
        if ( ID ) {
            dispatch( startGetInstructorCourses( ID ) );
        }
    }, [ dispatch, ID ]);

    const parameters = {
        properties: [
            { title: 'Id', name: 'ID' },
            { title: 'Course', name: 'Course' }
        ],
        data: secondData || [],
        loading: secondLoading || false,
        key: 'ID',
        dif: 'InstructorCourses'
    }

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableStart parameters={ parameters } />
            </div>
        </div>
    );
};
