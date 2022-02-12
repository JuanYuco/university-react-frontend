import { fetchConToken } from "../helpers/fetch";
import { closeSwal, loadingSwal, mensajeSwal } from "../helpers/loading";
import { createData, deleteData, getData, setStateData, updateData } from "./data"

const url = 'https://localhost:44395/api/Department';
export const startGetDepartments = () => {
    return async ( dispatch ) => {
        dispatch( setStateData( true ) );
        try {
            const resp = await fetchConToken( `${ url }/GetAll` );
            const { status } = resp;
            if ( status === 200 ) {
                const body = await resp.json();
                const newBody = body.map( d => ( convertDepartments( d ) ));
                dispatch( getData( newBody ) );
                dispatch( setStateData( false ) );    
            } else if ( status === 401 ) {
                window.location.reload();
            } else {
                dispatch(  getData( [] ) );
                dispatch( setStateData( false ) );
            }
        } catch ( error ) {
            dispatch(  getData( [] ) );
            dispatch( setStateData( false ) );
        }
    }
}

export const startCreateDepartment = ( department ) => {
    return async ( dispatch ) => {
        loadingSwal();
        delete department.Instructor;
        try {
            const resp = await fetchConToken( `${ url }/Create`, department, 'POST' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            if ( status === 200 ) {
                const newBody = convertDepartments( body );
                dispatch( createData( newBody ) );
                closeSwal();
                mensajeSwal( 'Proceso Exitoso', 'Se ha creado el departamento con exito', 'success' );
                return;
            }

            closeSwal();
            mensajeSwal( 'Error', body.Message, 'error' );
        } catch( error ) {
            closeSwal();
            mensajeSwal( 'Error', 'Comuniquese con el administrador', 'error' );
        }
    }
}

export const startUpdateDepartment = ( department ) => {
    return async ( dispatch ) => {
        loadingSwal();
        delete department.Instructor;
        try {
            const resp = await fetchConToken( `${ url }/Update`, department, 'PUT' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            if ( status === 200 ) {
                const newBody = convertDepartments( body );
                dispatch( updateData( 'DepartmentID', newBody ) );
                closeSwal();
                mensajeSwal( 'Proceso Exitoso', 'Se ha modificado el departamento con exito', 'success' );
                return;
            }

            closeSwal();
            mensajeSwal( 'Error', body.Message, 'error' );
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error', 'Comuniquese con el administrador', 'error' );
        }
    }
}

export const startDeleteDepartment = ( department ) => {
    return async ( dispatch ) => {
        loadingSwal();
        const { DepartmentID:id } = department;
        try {
            const resp = await fetchConToken( `${ url }/Delete?id=${ id }`, {}, 'DELETE' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            } else if ( status === 200 ) {
                dispatch( deleteData( 'DepartmentID', id ) );
                closeSwal();
                mensajeSwal( 'Proceso Exitoso', 'Se ha eliminado el departamento con exito', 'success' );
                return;
            }

            const body = await resp.json();
            closeSwal();
            mensajeSwal( 'Error', body.Message, 'error' );
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error', 'Comuniquese con el administrador', 'error' );
        }
    }
}

const convertDepartments = ( department ) => ({
    ...department,
    Instructor: `${ department.Instructor.FirstMidName } ${ department.Instructor.LastName }`
})