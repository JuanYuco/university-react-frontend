import React from 'react';
import { useSelector } from 'react-redux';
import { startDeleteOfficesAssignment, startGetOfficesAssignmnet } from '../../actions/officesAssignment';
import { useFormFunctions } from '../../hooks/useFormFunctions';
import { TableStart } from '../table/TableStart';
import { OfficeAssignmentForm } from './OfficeAssignmentForm';

export const OfficeAssignmentScreen = () => {
    const [ setActiveCreate, setActiveUpdate, deleteOfficeAssignment ] = useFormFunctions( startGetOfficesAssignmnet, startDeleteOfficesAssignment, 'active' );
    const { data, loading } = useSelector( state => state.data );

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
