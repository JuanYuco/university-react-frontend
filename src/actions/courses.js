import { fetchConToken } from "../helpers/fetch";
import { createData, deleteData, getData, setStateData, updateData } from "./data";
import { closeSwal, loadingSwal, mensajeSwal } from "../helpers/loading";

export const startGetCourses = () => {
    return async ( dispatch ) => {
        dispatch( setStateData( true ) );
        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Course/GetAll' );
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

export const startCreateCourse = ( course ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Course/Create', course, 'POST' );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                dispatch( createData( body ) );
                closeSwal();
                mensajeSwal( 'Proceso Exitoso', 'El curso se ha creado con exito', 'success' );
            } else if ( resp.status === 401 ) {
                window.location.reload();
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error Interno', 'Comuniquese con el administrador', 'error' );
        }
    }
}

export const startUpdateCourse = ( course ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Course/Update', course, 'PUT' );
            if ( resp.body ) {
                const body = await resp.json();
                if ( resp.status === 200 ) {
                    dispatch( updateData( 'CourseID', body ) );
                    closeSwal();
                    mensajeSwal( 'Proceso Exitoso', 'El curso se ha modificado con exito', 'success' );
                } else if ( resp.status === 400 ) {
                    closeSwal();
                    mensajeSwal( 'Error Interno', body.Message, 'error' );
                }
            }
            else if ( resp.status === 401 ) {
                window.location.reload();
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error Interno', 'Comuniquese con el administrador', 'error' );
        }
    }
}

export const startDeleteCourse = ( courseId ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `https://localhost:44395/api/Course/Delete?id=${ courseId }`, {}, 'DELETE' );
            if ( resp.status === 200 ) {
                dispatch( deleteData( 'CourseID', courseId ) );
                closeSwal();
                mensajeSwal( 'Proceso Exitoso', 'El curso se ha eliminado con exito', 'success' );
            } else if ( resp.body ) {
                const body = await resp.json();
                closeSwal();
                mensajeSwal( 'Error Interno', body.Message, 'error' );
            } else {
                window.location.reload();
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error Interno', 'Comuniquese con el administrador', 'error' );
        }
    }
}