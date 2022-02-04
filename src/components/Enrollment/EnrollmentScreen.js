import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { startGetEnrollment } from '../../actions/Enrollment';
import { TableStart } from '../table/TableStart';
import { EnrollmentForm } from './EnrollmentForm';

export const EnrollmentScreen = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector( state => state.data );

    const setActiveUpdate = useCallback( ( enrollment ) => {
        dispatch( setActiveData( enrollment ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData() );
    }, [dispatch]);

    useEffect( () => {
        dispatch( startGetEnrollment() );
    }, [ dispatch ]);

    const parameters = {
        properties: [
            { title: 'ID', name: 'EnrollmentID' },
            { title: 'Student', name: 'Student' },
            { title: 'Course', name: 'Course' },
            { title: 'Grade', name: 'Grade' }
        ],
        key:'ID',
        data,
        loading,
        dif: 'Enrollment',
        update: setActiveUpdate,
        create: setActiveCreate
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
