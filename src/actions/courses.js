import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startGetCourses = () => {
    return async ( dispatch ) => {
        dispatch( stateGet( true ) );
        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Course/GetAll' );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                dispatch( get( body ) );
                dispatch( stateGet( false ) );
            } else if ( resp.status === 401 ) {
                dispatch( get( [] ) );
                dispatch( stateGet( false ) );
                window.location.reload();
            }
        } catch ( error ) {
            dispatch( get( [] ) );
            dispatch( stateGet( false ) );
        }
    }
}

export const startCreateCourse = ( course ) => {
    return async ( dispatch ) => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false
        });

        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Course/Create', course, 'POST' );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                dispatch( createCourse( body ) );
                Swal.close();
                Swal.fire( 'Proceso Exitoso', 'El curso se ha creado con exito', 'success' );
            } else if ( resp.status === 401 ) {
                window.location.reload();
            }
        } catch ( error ) {
            Swal.close();
            Swal.fire( 'Error Interno', 'Comuniquese con el administrador', 'error' );
        }
    }
}

export const startUpdateCourse = ( course ) => {
    return async ( dispatch ) => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false
        });

        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Course/Update', course, 'PUT' );
            if ( resp.body ) {
                const body = await resp.json();
                if ( resp.status === 200 ) {
                    dispatch( updateCourse( body ) );
                    Swal.close();
                    Swal.fire( 'Proceso Exitoso', 'El curso se ha modificado con exito', 'success' );
                } else if ( resp.status === 400 ) {
                    Swal.close();
                    Swal.fire( 'Error', body.Message, 'error' );
                }
            }
            else if ( resp.status === 401 ) {
                window.location.reload();
            }
        } catch ( error ) {
            Swal.close();
            Swal.fire( 'Error Interno', 'Comuniquese con el administrador', 'error' );
        }
    }
}

export const startDeleteCourse = ( courseId ) => {
    return async ( dispatch ) => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false
        });

        try {
            const resp = await fetchConToken( `https://localhost:44395/api/Course/Delete?id=${ courseId }`, {}, 'DELETE' );
            if ( resp.status === 200 ) {
                dispatch( deleteCourse( courseId ) );
                Swal.close();
                Swal.fire( 'Proceso Exitoso', 'El curso se ha eliminado con exito', 'success' );
            } else if ( resp.body ) {
                const body = await resp.json();
                console.log( body );
                Swal.close();
                Swal.fire( 'Error', body.Message, 'error' );
            } else {
                window.location.reload();
            }
        } catch ( error ) {
            Swal.close();
            Swal.fire( 'Error Interno', 'Comuniquese con el administrador', 'error' );
        }
    }
}

const updateCourse = ( course ) => ({
    type: types.coursesUpdate,
    payload: course
});

const createCourse = ( course ) => ({
    type: types.coursesCreate,
    payload: course
});

const deleteCourse = ( courseId ) => ({
    type: types.courseDelete,
    payload: courseId
})

const stateGet = ( loading ) => ({
    type: types.coursesGetState,
    payload: loading
});

const get = ( courses ) => ({
    type: types.coursesGet,
    payload: courses
});

export const setActiveCourse = ( course ) => ({
    type: types.coursesSetActive,
    payload: course
});

export const resetActiveCourse = () => ({
    type: types.coursesResetActive
});