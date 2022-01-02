import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveData, setResetActiveData } from '../../actions/data';
import { startGetOfficesAssignmnet } from '../../actions/officesAssignment';
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
            create: setActiveCreate
        };
        dispatch( startParameters( parameters ) );
    }, [ dispatch, setActiveUpdate, setActiveCreate ]);

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
