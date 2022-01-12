import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { startDeleteDepartment, startGetDepartments } from '../../actions/departments';
import { TableStart } from '../table/TableStart';
import { DepartmentForm } from './DepartmentForm';

export const DepartmentScreen = () => {
    const { data, loading } = useSelector( state => state.data );
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
    }, [ dispatch ]);

    const parameters = {
        properties: [
            { title: 'ID', name: 'DepartmentID' },
            { title: 'Name', name: 'Name' },
            { title: 'Budget', name:'Budget' },
            { title: 'Start Date', name: 'StartDate' },
            { title: 'Instructor', name: 'Instructor' }
        ],
        key:'DepartmentID',
        data,
        loading,
        update: setActiveUpdate,
        create: setActiveCreate,
        delete: deleteDepartment,
        dif: 'Department'
    };

    return (
        <div className="row m-3">
            <div className="col-6">
                <h3>Departments</h3>
                <TableStart parameters={ parameters } />
            </div>
            <div className="col-6">
                <DepartmentForm />
            </div>
        </div>
    )
}
