import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteCourse, startGetCourses } from '../../actions/courses';
import { CoursesForm } from './CoursesForm';
import Swal from 'sweetalert2';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { TableStart } from '../table/TableStart';

export const CoursesTable = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector( state => state.data );

    const setActiveUpdate = useCallback( ( course ) => {
        dispatch( setActiveData( course ) );
    },[ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData() );
    }, [dispatch]);

    const deleteAlert = useCallback( ( course ) => {
        Swal.fire({
            title: 'Eliminar Curso',
            text: `Esta seguro que desea elimnar el curso ${ course.Title }`,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then( ( result ) => {
            if ( result.isConfirmed ){
                dispatch( startDeleteCourse( course.CourseID ) );
            }
        });
    }, [ dispatch ]);

    useEffect(() => {
        dispatch( startGetCourses() );
    }, [ dispatch ]);

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
