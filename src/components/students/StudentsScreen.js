import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { startDeleteStudent, startGetStudents } from '../../actions/students';
import { TableStart } from '../table/TableStart';
import { StudentsForm } from './StudentsForm';

export const StudentsScreen = () => {
    const { data, loading } = useSelector( state => state.data );
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( student ) => {
        dispatch( setActiveData( student ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData() );
    }, [ dispatch ]);

    const setDeleteStudent = useCallback( ( student ) => {
        Swal.fire({
            title: 'Eliminar Curso',
            text: `Esta seguro que desea eliminar el estudiante ${ student.FirstMidName }`,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then( ( result ) => {
            if ( result.isConfirmed ){
                dispatch( startDeleteStudent( student.ID ) );
            }
        });
    }, [ dispatch ]);

    useEffect( () => {
        dispatch( startGetStudents() );
    }, [ dispatch ]);

    const parameters = {
        properties: [
            { title: 'Id', name: 'ID' },
            { title: 'First Mid Name', name: 'FirstMidName' },
            { title: 'Last Name', name: 'LastName' },
            { title: 'Enrollment Date', name: 'EnrollmentDate' }
        ],
        key:'ID',
        data,
        loading,
        update: setActiveUpdate,
        create: setActiveCreate,
        delete: setDeleteStudent,
        dif: 'Student'
    };

    return (
        <div className="row m-3">
            <div className="col-6">
                <TableStart parameters={ parameters }/>
            </div>
            <div className="col-6">
                <StudentsForm />
            </div>
        </div>
    )
}
