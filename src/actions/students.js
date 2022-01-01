import { fetchConToken } from "../helpers/fetch";
import { closeSwal, loadingSwal, mensajeSwal } from "../helpers/loading";
import { createData, deleteData, getData, setStateData, updateData } from "./data"

const url = 'https://localhost:44395/api/Student';
export const startGetStudents = () => {
    return async ( dispatch ) => {
        dispatch( setStateData( true ) );
        try {
            const resp = await fetchConToken( `${ url }/GetAll` );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                dispatch( getData( body ) );
                dispatch( setStateData( false ) );
            }
            else if ( resp.status === 401 ) {
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

export const startCreateStudent = ( student ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Create`, student, 'POST' );
            const body = await resp.json();
            if ( resp.status === 200 ) {
                dispatch( createData( body ) );
                closeSwal();
                mensajeSwal( 'Exitoso', 'El estudiante fue creado', 'success' );
            }
            else if ( resp.status === 400 || resp.status === 500 ) {
                closeSwal();
                mensajeSwal( 'Error', body.Message, 'error' );
            }
            else if ( resp.status === 401 ) {
                window.location.reload();
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'error', 'Contacte con el administrador', 'error' );
        }
    }
}

export const startUpdateStudent = ( student ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Update`, student, 'PUT' );
            const body = await resp.json();
            if ( resp.status === 200 ) {
                dispatch( updateData( 'ID', body ) );
                closeSwal();
                mensajeSwal( 'Exitoso', 'El estudiante fue modificado', 'success' );
            }
            else if ( resp.status === 400 || resp.status === 500 ) {
                closeSwal();
                mensajeSwal( 'Error', body.Message, 'error' );
            }
            else if ( resp.status === 401 ) {
                window.location.reload();
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'error', 'Contacte con el administrador', 'error' );
        }
    }
}

export const startDeleteStudent = ( id ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Delete?id=${ id }`, {}, 'DELETE' );
            if ( resp.status === 200 ) {
                dispatch( deleteData( 'ID', id ) );
                closeSwal();
                mensajeSwal( 'Exitoso', 'El estudiante fue eliminado', 'success' );
            }
            else if ( resp.status === 400 || resp.status === 500 ) {
                const body = await resp.json();
                closeSwal();
                mensajeSwal( 'Error', body.Message, 'error' );
            }
            else if ( resp.status === 401 ) {
                window.location.reload();
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'error', 'Contacte con el administrador', 'error' );
        }
    }
}