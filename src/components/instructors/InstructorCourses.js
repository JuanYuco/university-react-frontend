import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { startDeleteCourseInstructor } from '../../actions/courses';
import { getData, setActiveData, setResetActiveData } from '../../actions/data';
import { startGetInstructorCourses } from '../../actions/instructors';
import { TableStart } from '../table/TableStart';
import { InstructorCoursesForm } from './InstructorCoursesForm';

const propertieName = 'secondDataActive';
export const InstructorCourses = () => {
    const { active, secondData, secondLoading } = useSelector( state => state.data );   
    const { ID, FirstMidName, LastName } = active;
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( instructorCourse ) => {
        dispatch( setActiveData( instructorCourse, propertieName ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData( propertieName ) );
    }, [ dispatch ]);

    const startDelete = useCallback( ( courseInstructor ) => {
        Swal.fire({
            title: 'Eliminar Instructor del curso',
            text: `Esta seguro que desea elimnar el curso ${ courseInstructor.Course }`,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then( ( result ) => {
            if ( result.isConfirmed ){
                dispatch( startDeleteCourseInstructor( courseInstructor.ID ) );
            }
        });
    }, [ dispatch ]);

    useEffect( () => {
        if ( ID ) {
            dispatch( startGetInstructorCourses( ID ) );
        } else {
            dispatch( getData( [], 'secondData' ) );
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
        dif: 'InstructorCourses',
        update: setActiveUpdate,
        create: setActiveCreate,
        delete: startDelete
    }

    return (
        <>
            {
                ( ID ) &&
                <h3 className="m-3">Cursos del instructor { `${ FirstMidName } ${ LastName }` }</h3>
            }
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
