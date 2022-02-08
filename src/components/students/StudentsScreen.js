import React from 'react'
import { useSelector } from 'react-redux';
import { startDeleteStudent, startGetStudents } from '../../actions/students';
import { useFormFunctions } from '../../hooks/useFormFunctions';
import { TableStart } from '../table/TableStart';
import { StudentsForm } from './StudentsForm';

export const StudentsScreen = () => {
    const [ setActiveCreate, setActiveUpdate, setDeleteStudent ] = useFormFunctions( startGetStudents, startDeleteStudent, 'active' );
    const { data, loading } = useSelector( state => state.data );

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
