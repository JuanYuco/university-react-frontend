import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetActiveCourse, setActiveCourse, startDeleteCourse, startGetCourses } from '../../actions/courses';
import { startParameters } from '../../actions/table';
import { TableRender } from '../table/TableRender';
import { CoursesForm } from './CoursesForm';
import Swal from 'sweetalert2';

export const CoursesScreen = () => {
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( course ) => {
        dispatch( setActiveCourse( course ) );
    },[ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( resetActiveCourse() );
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
        const parameters = {
            properties: [
                { title: 'Id', name: 'CourseID' },
                { title: 'Title', name: 'Title' },
                { title: 'Credits', name: 'Credits' }
            ],
            key:'CourseID',
            stateName: 'courses',
            subState: 'courses',
            create: setActiveCreate,
            update: setActiveUpdate,
            delete: deleteAlert
        }

        dispatch( startParameters( parameters ) );
    }, [ dispatch, setActiveUpdate, setActiveCreate, deleteAlert ]);

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableRender />
            </div>
            <div className="col-6">
                <CoursesForm />
            </div>
        </div>
    )
}
