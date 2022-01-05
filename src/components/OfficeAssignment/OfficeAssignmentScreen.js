import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { startDeleteOfficesAssignment, startGetOfficesAssignmnet } from '../../actions/officesAssignment';
import { startParameters } from '../../actions/table';
import { TableRender } from '../table/TableRender';
import { OfficeAssignmentForm } from './OfficeAssignmentForm';

export const OfficeAssignmentScreen = () => {
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
        const parameters = {
            properties: [
                { title: 'Instructor ID', name: 'InstructorID' },
                { title: 'Instructor Name', name: 'InstructorName' },
                { title: 'Location', name: 'Location' }
            ],
            key:'InstructorID',
            stateName: 'data',
            subState: 'data',
            update: setActiveUpdate,
            create: setActiveCreate,
            delete: deleteOfficeAssignment
        };
        dispatch( startParameters( parameters ) );
    }, [ dispatch, setActiveUpdate, setActiveCreate, deleteOfficeAssignment ]);

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableRender />
            </div>
            <div className="col-6">
                <OfficeAssignmentForm />
            </div>
        </div>
    )
}
