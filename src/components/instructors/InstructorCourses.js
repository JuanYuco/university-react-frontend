import React from 'react';
import { useSelector } from 'react-redux';
import { startDeleteCourseInstructor } from '../../actions/courses';
import { startGetInstructorCourses } from '../../actions/instructors';
import { useFormFunctions } from '../../hooks/useFormFunctions';
import { TableStart } from '../table/TableStart';
import { InstructorCoursesForm } from './InstructorCoursesForm';

export const InstructorCourses = () => {
    const { active, secondData, secondLoading } = useSelector( state => state.data );   
    const { ID, FirstMidName, LastName } = active;
    const [ setActiveCreate, setActiveUpdate, startDelete ] = useFormFunctions( startGetInstructorCourses, startDeleteCourseInstructor, 'secondDataActive', ID, 'secondData' );

    const parameters = {
        properties: [
            { title: 'Id', name: 'ID' },
            { title: 'Course', name: 'Course' }
        ],
        data: secondData || [],
        loading: secondLoading || false,
        key: 'ID',
        dif: 'InstructorCourses',
        update: setActiveUpdate,
        create: setActiveCreate,
        delete: startDelete
    }

    if ( !ID ) {
        return <></>;
    }
    
    return (
        <>
            <h3 className="m-3">Cursos del instructor { `${ FirstMidName } ${ LastName }` }</h3>
            <div className="m-3 row">
                <div className="col-6">
                    <TableStart parameters={ parameters } />
                </div>
                <div className="col-6">
                    <InstructorCoursesForm InstructorID={ ID }/>
                </div>
            </div>
        </>
    );
};
