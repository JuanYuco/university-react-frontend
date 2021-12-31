import { fetchConToken } from "../helpers/fetch";
import { closeSwal, mensajeSwal, loadingSwal } from "../helpers/loading";
import { createData, deleteData, getData, setStateData, updateData } from "./data";

const url = 'https://localhost:44395/api/Instructor';
const internalError = 'Hubo un error interno comuniquese con el administrador';
export const startGetInstructors = () => {
    return async ( dispatch ) => {
        dispatch( setStateData( true ) );
        try {
            const resp = await fetchConToken( `${ url }/GetAll` );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                dispatch( getData( body ) );
                dispatch( setStateData( false ) );
            } else if ( resp.status === 401 ) {
                dispatch( getData( [] ) );
                dispatch( setStateData( false ) );
                window.location.reload();
            }
        } catch ( error ) {
            dispatch( getData( [] ) );
            dispatch( setStateData( false ) );
        }
    }
}

export const startCreateInstructors = ( instructor ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Create`, instructor, 'POST' );
            if ( resp.body ) {
                const body = await resp.json();
                if ( resp.status === 200 ) {
                    dispatch( createData( body ) );
                    closeSwal();
                    mensajeSwal( 'Proceso exitoso', 'Instructor creado con exito', 'success' );
                } else if ( resp.status === 400 || resp.status === 500 ) {
                    closeSwal();
                    mensajeSwal( 'Error', body.Message, 'error' );
                } else if ( resp.status === 401 ) {
                    window.location.reload();
                }
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error', internalError, 'error' );
        }
    }
}

export const startUpdateInstructors = ( instructor ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Update`, instructor, 'PUT' );
            if ( resp.body ) {
                const body = await resp.json();
                if ( resp.status === 200 ) {
                    dispatch( updateData( 'ID', body ) );
                    closeSwal();
                    mensajeSwal( 'Proceso exitoso', 'Instructor modificado con exito', 'success' );
                } else if ( resp.status === 400 || resp.status === 500 ) {
                    closeSwal();
                    mensajeSwal( 'Error', body.Message, 'error' );
                } else if ( resp.status === 401 ) {
                    window.location.reload();
                }
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error', internalError, 'error' );
        }
    }
}

export const startDeleteInstructors = ( instructorID ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Delete?id=${ instructorID }`, {}, 'DELETE' );
            if ( resp.status === 200 ) {
                dispatch( deleteData( 'ID', instructorID ) );
                closeSwal();
                mensajeSwal( 'Proceso exitoso', 'Instructor modificado con exito', 'success' );
            } 
            else if ( resp.status === 401 ) {
                window.location.reload();
            } 
            else if ( resp.status === 400 || resp.status === 500 ) {
                const body = await resp.json();
                closeSwal();
                mensajeSwal( 'Error', body.Message, 'error' );
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error', internalError, 'error' );
        }
    }
}