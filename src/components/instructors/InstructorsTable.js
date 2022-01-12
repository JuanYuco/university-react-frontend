import React, { useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteInstructors, startGetInstructors } from '../../actions/instructors';
import { InstructorsForm } from './InstructorsForm';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { TableStart } from '../table/TableStart';

export const InstructorsTable = () => {
    const { data, loading } = useSelector( state => state.data );
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( instructor ) => {
        dispatch( setActiveData( instructor ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData() );
    }, [ dispatch ]);

    const deleteInstructorAlert = useCallback( ( instructor ) => {
        Swal.fire({
            title: 'Eliminar Instructor',
            text: `Esta seguro que desea eliminar al instructor de nombre ${ instructor.FirstMidName }`,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then( ( result ) => {
            if ( result.isConfirmed ) {
                dispatch( startDeleteInstructors( instructor.ID ) );
            }
        });
    }, [ dispatch ]);

    useEffect( () => {
        dispatch( startGetInstructors() );
    }, [ dispatch ]);

    const parameters = {
        properties: [
            { title: 'Id', name: 'ID' },
            { title: 'First Mid Name', name: 'FirstMidName' },
            { title: 'Last Name', name: 'LastName' },
            { title: 'Hire Date', name: 'HireDate' }
        ],
        key:'ID',
        data,
        loading,
        update: setActiveUpdate,
        create: setActiveCreate,
        delete: deleteInstructorAlert,
        dif: 'Instructor'
    };

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableStart parameters={ parameters }/>
            </div>
            <div className="col-6">
                <InstructorsForm />
            </div>
        </div>
    )
}
