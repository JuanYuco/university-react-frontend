import React from 'react';
import { useSelector } from 'react-redux';
import { startDeleteEnrollment, startGetEnrollment } from '../../actions/Enrollment';
import { useFormFunctions } from '../../hooks/useFormFunctions';
import { TableStart } from '../table/TableStart';
import { EnrollmentForm } from './EnrollmentForm';

export const EnrollmentScreen = () => {
    const { data, loading } = useSelector( state => state.data );
    const [ setActiveCreate, setActiveUpdate, deleteAlert ] = useFormFunctions(startGetEnrollment,startDeleteEnrollment, 'active');

    const parameters = {
        properties: [
            { title: 'ID', name: 'EnrollmentID' },
            { title: 'Student', name: 'Student' },
            { title: 'Course', name: 'Course' },
            { title: 'Grade', name: 'Grade' }
        ],
        key:'EnrollmentID',
        data,
        loading,
        dif: 'Enrollment',
        update: setActiveUpdate,
        create: setActiveCreate,
        delete: deleteAlert
    };
    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableStart parameters={ parameters } />
            </div>
            <div className="col-6">
                <EnrollmentForm />
            </div>
        </div>
    );
};
