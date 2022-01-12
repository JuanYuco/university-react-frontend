import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { startDeleteOfficesAssignment, startGetOfficesAssignmnet } from '../../actions/officesAssignment';
import { TableStart } from '../table/TableStart';
import { OfficeAssignmentForm } from './OfficeAssignmentForm';

export const OfficeAssignmentScreen = () => {
    const { data, loading } = useSelector( state => state.data );
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( officesAssignment ) => {
        dispatch( setActiveData( officesAssignment ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData() );
    }, [ dispatch ] );

    const deleteOfficeAssignment = useCallback( ( OfficeAssignment ) => {
        Swal.fire({
            title: 'Eliminar Oficina',
            text: `Esta seguro que desea elimnar la oficina ${ OfficeAssignment.Location }`,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then( ( result ) => {
            if ( result.isConfirmed ){
                dispatch( startDeleteOfficesAssignment( OfficeAssignment.InstructorID ) );
            }
        });
    }, [ dispatch ]);

    useEffect( () => {
        dispatch( startGetOfficesAssignmnet() );
    }, [ dispatch ]);

    const parameters = {
        properties: [
            { title: 'Instructor ID', name: 'InstructorID' },
            { title: 'Instructor Name', name: 'InstructorName' },
            { title: 'Location', name: 'Location' }
        ],
        key:'InstructorID',
        data,
        loading,
        update: setActiveUpdate,
        create: setActiveCreate,
        delete: deleteOfficeAssignment,
        dif: 'OfficeAssignment'
    };

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableStart parameters={ parameters } />
            </div>
            <div className="col-6">
                <OfficeAssignmentForm />
            </div>
        </div>
    )
}
