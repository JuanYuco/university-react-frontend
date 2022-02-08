import React from 'react';
import { useSelector } from 'react-redux';
import { startDeleteCourse, startGetCourses } from '../../actions/courses';
import { CoursesForm } from './CoursesForm';
import { TableStart } from '../table/TableStart';
import { useFormFunctions } from '../../hooks/useFormFunctions';

export const CoursesTable = () => {
    const [ setActiveCreate, setActiveUpdate, deleteAlert ] = useFormFunctions( startGetCourses, startDeleteCourse, 'active' );
    const { data, loading } = useSelector( state => state.data );

    const parameters = {
        properties: [
            { title: 'Id', name: 'CourseID' },
            { title: 'Title', name: 'Title' },
            { title: 'Credits', name: 'Credits' }
        ],
        key:'CourseID',
        data: data,
        loading: loading,
        create: setActiveCreate,
        update: setActiveUpdate,
        delete: deleteAlert,
        dif: 'Courses'
    };

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableStart parameters={ parameters } />
            </div>
            <div className="col-6">
                <CoursesForm />
            </div>
        </div>
    )
}
