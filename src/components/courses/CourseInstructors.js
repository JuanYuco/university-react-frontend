import React from 'react';
import { useSelector } from 'react-redux';
import { startDeleteCourseInstructor, startGetCourseInstructor } from '../../actions/courses';
import { useFormFunctions } from '../../hooks/useFormFunctions';
import { TableStart } from '../table/TableStart';
import { CourseInstructorsForm } from './CourseInstructorsForm';

export const CourseInstructors = () => {
    const { active, secondData, secondLoading } = useSelector( state => state.data );
    const { CourseID, Title } = active;
    const [ setActiveCreate, setActiveUpdate, startDelete ] = useFormFunctions( startGetCourseInstructor, startDeleteCourseInstructor, 'secondDataActive', CourseID, 'SecondData' );

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
        create: setActiveCreate,
        delete: startDelete
    };

    if ( !CourseID ) {
        return <></>;
    }

    return (
        <>
            <h3 className="m-3">Instructores del curso { Title }</h3>
            <div className="m-3 row">
                <div className="col-6">
                    <TableStart  parameters={ parameters } />
                </div>
                <div className="col-6">
                    <CourseInstructorsForm CourseID={ CourseID }/>
                </div>
            </div>
        </>
    )
}
