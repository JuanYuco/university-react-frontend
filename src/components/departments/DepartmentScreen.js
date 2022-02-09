import React from 'react';
import { useSelector } from 'react-redux';
import { startDeleteDepartment, startGetDepartments } from '../../actions/departments';
import { useFormFunctions } from '../../hooks/useFormFunctions';
import { TableStart } from '../table/TableStart';
import { DepartmentForm } from './DepartmentForm';

export const DepartmentScreen = () => {
    const [ setActiveCreate, setActiveUpdate, deleteDepartment ] = useFormFunctions( startGetDepartments, startDeleteDepartment, 'active' );
    const { data, loading } = useSelector( state => state.data );

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
