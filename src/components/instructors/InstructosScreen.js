import React, { useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setActiveInstructor, setActiveInstructorCreate, startGetInstructors } from '../../actions/instructors';
import { startParameters } from '../../actions/table';
import { TableRender } from '../table/TableRender';
import { InstructorsForm } from './InstructorsForm';

export const InstructosScreen = () => {
    const dispatch = useDispatch();

    const setActiveUpdate = useCallback( ( instructor ) => {
        dispatch( setActiveInstructor( instructor ) );
    }, [ dispatch ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setActiveInstructorCreate() );
    }, [ dispatch ]);

    const deleteInstructorAlert = useCallback( ( instructor ) => {
        Swal.fire({
            title: 'Eliminar Instructor',
            text: `Esta seguro que desea eliminar al instructor de nombre ${ instructor.FirstMidName }`,
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        })
    }, []);

    useEffect( () => {
        dispatch( startGetInstructors() );
        const parameters = {
            properties: [
                { title: 'Id', name: 'ID' },
                { title: 'First Mid Name', name: 'FirstMidName' },
                { title: 'Last Name', name: 'LastName' },
                { title: 'Hire Date', name: 'HireDate' }
            ],
            key:'ID',
            stateName: 'instructors',
            subState: 'instructors',
            update: setActiveUpdate,
            create: setActiveCreate,
            delete: deleteInstructorAlert
        };
        dispatch( startParameters( parameters ) );
    }, [ dispatch, setActiveUpdate, setActiveCreate, deleteInstructorAlert ]);

    return (
        <div className="m-3 row">
            <div className="col-6">
                <TableRender />
            </div>
            <div className="col-6">
                <InstructorsForm />
            </div>
        </div>
    )
}
