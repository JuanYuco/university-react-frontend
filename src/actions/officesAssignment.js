import { fetchConToken } from "../helpers/fetch";
import { closeSwal, loadingSwal, mensajeSwal } from "../helpers/loading";
import { createData, deleteData, getData, setStateData, updateData } from "./data";

const url = 'https://localhost:44395/api/OfficeAssignment';

export const startGetOfficesAssignmnet = () => {
    return async ( dispatch ) => {
        dispatch( setStateData( true ) );
        try {
            const resp = await fetchConToken( `${ url }/GetAll` );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                const newData = convertOfficesAssignmentArray( body );

                dispatch( getData( newData ) );
                dispatch( setStateData( false ) );
            } else if ( resp.status === 401 ) {
                window.location.reload();
            } else {
                dispatch( getData( [] ) );
                dispatch( setStateData( false ) );
            }
        } catch ( error ) {
            dispatch( getData( [] ) );
            dispatch( setStateData( false ) );
        }
    }
}

export const startCreateOfficesAssignment = ( officesAssignment ) => {
    return async ( dispatch ) => {
        loadingSwal();
        delete officesAssignment.Instructor;
        try {
            const resp = await fetchConToken( `${ url }/Create`, officesAssignment, 'POST' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            if ( status === 200 ) {
                dispatch( createData( convertOfficesAssignment( body ) ) );
                closeSwal();
                mensajeSwal('Proceso Exitoso!', 'El instructor se ha creado con exito', 'success');
            } else if ( status === 400 || status === 500 ) {
                closeSwal();
                mensajeSwal('Error', body.Message, 'error');
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal('Error', 'Comuniquese con el administrador', 'error');
        }
    }
}

export const startUpdateOfficesAssignment = ( officesAssignment ) => {
    return async ( dispatch ) => {
        loadingSwal();
        delete officesAssignment.Instructor;
        try {
            const resp = await fetchConToken( `${ url }/Update`, officesAssignment, 'PUT' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            if ( status === 200 ) {
                dispatch( updateData( 'InstructorID', convertOfficesAssignment( body ) ) );
                closeSwal();
                mensajeSwal('Proceso Exitoso!', 'El instructor se ha modificado con exito', 'success');
            } else if ( status === 400 || status === 500 ) {
                closeSwal();
                mensajeSwal('Error', body.Message, 'error');
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal('Error', 'Comuniquese con el administrador', 'error');
        }
    }
}

export const startDeleteOfficesAssignment = ( officesAssignment ) => {
    return async ( dispatch ) => {
        loadingSwal();
        const { InstructorID:id } = officesAssignment;
        try {
            const resp = await fetchConToken( `${ url }/Delete?id=${ id }`, {}, 'DELETE' );
            const { status } = resp;
            if ( status === 200 ) {
                dispatch( deleteData( 'InstructorID', id ) );
                closeSwal();
                mensajeSwal('Proceso Exitoso!', 'El instructor se ha eliminado con exito', 'success');
                return;
            } else if( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            closeSwal();
            mensajeSwal('Error', body.Message, 'error');
        } catch ( error ) {
            closeSwal();
            mensajeSwal('Error', 'Comuniquese con el administrador', 'error');
        }
    }
}

const convertOfficesAssignmentArray = ( data ) => (
    data.map( data => ( convertOfficesAssignment( data ) ))
);

const convertOfficesAssignment = ( { InstructorID, Location, Instructor } ) => ({
    InstructorID,
    Location,
    InstructorName: `${ Instructor.FirstMidName } ${ Instructor.LastName }`
})