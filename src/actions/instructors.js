import { fetchConToken } from "../helpers/fetch";
import { closeSwal, mensajeSwal, loadingSwal } from "../helpers/loading";
import { types } from "../types/types";

const url = 'https://localhost:44395/api/Instructor';
const internalError = 'Hubo un error interno comuniquese con el administrador';
export const startGetInstructors = () => {
    return async ( dispatch ) => {
        dispatch( stateGet( true ) );
        try {
            const resp = await fetchConToken( `${ url }/GetAll` );
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

export const startCreateInstructors = ( instructor ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Create`, instructor, 'POST' );
            if ( resp.body ) {
                const body = await resp.json();
                if ( resp.status === 200 ) {
                    dispatch( createInstructor( body ) );
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
                    dispatch( updateInstructor( body ) );
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
                dispatch( deleteInstructor( instructorID ) );
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

const createInstructor = ( instructor ) => ({
    type: types.instructorsCreate,
    payload: instructor
});

const updateInstructor = ( instructor ) => ({
    type: types.instructorsUpdate,
    payload: instructor
});

const deleteInstructor = ( instructorID ) => ({
    type: types.instructorsDelete,
    payload: instructorID
});

export const setActiveInstructor = ( instructor ) => ({
    type: types.instructorsSetActive,
    payload: instructor
});

export const setActiveInstructorCreate = () => ({
    type: types.instructorsResetActive
});

const stateGet = ( state ) => ({
    type: types.instructorsGetState,
    payload: state
});

const get = ( instructors ) => ({
    type: types.instructorsGet,
    payload: [ ...instructors ]
});