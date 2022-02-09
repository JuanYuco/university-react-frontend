import React from 'react';
import { useSelector } from 'react-redux';
import { startDeleteInstructors, startGetInstructors } from '../../actions/instructors';
import { InstructorsForm } from './InstructorsForm';
import { TableStart } from '../table/TableStart';
import { useFormFunctions } from '../../hooks/useFormFunctions';

export const InstructorsTable = () => {
    const [ setActiveCreate, setActiveUpdate, deleteInstructorAlert ] = useFormFunctions( startGetInstructors, startDeleteInstructors, 'active' );
    const { data, loading } = useSelector( state => state.data );

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
