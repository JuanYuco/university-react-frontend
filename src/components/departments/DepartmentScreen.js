import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { startDeleteDepartment, startGetDepartments } from '../../actions/departments';
import { startParameters } from '../../actions/table';
import { TableRender } from '../table/TableRender';
import { DepartmentForm } from './DepartmentForm';

export const DepartmentScreen = () => {
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( department ) =>  {
        dispatch( setActiveData( department ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData() );
    }, [ dispatch ]);

    const deleteDepartment = useCallback( ( department ) => {
        Swal.fire({
            title: 'Eliminar Departamento',
            text: `Esta seguro que desea elimnar el departamento ${ department.Name }`,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then( ( result ) => {
            if ( result.isConfirmed ){
                dispatch( startDeleteDepartment( department.DepartmentID ) );
            }
        });
    }, [ dispatch ]);


    useEffect( () => {
        dispatch( startGetDepartments() );
        const parameters = {
            properties: [
                { title: 'ID', name: 'DepartmentID' },
                { title: 'Name', name: 'Name' },
                { title: 'Budget', name:'Budget' },
                { title: 'Start Date', name: 'StartDate' },
                { title: 'Instructor', name: 'Instructor' }
            ],
            key:'DepartmentID',
            stateName: 'data',
            subState: 'data',
            update: setActiveUpdate,
            create: setActiveCreate,
            delete: deleteDepartment
        }
        dispatch( startParameters( parameters ) );
    }, [ dispatch, setActiveUpdate, setActiveCreate, deleteDepartment ]);

    return (
        <div className="row m-3">
            <div className="col-6">
                <h3>Departments</h3>
                <TableRender />
            </div>
            <div className="col-6">
                <DepartmentForm />
            </div>
        </div>
    )
}
