import { fetchConToken } from "../helpers/fetch";
import { getInstructors } from "../helpers/Instructors";
import { closeSwal, mensajeSwal, loadingSwal } from "../helpers/loading";
import { createData, deleteData, getData, setStateData, updateData } from "./data";

const url = 'https://localhost:44395/api/Instructor';
const urlCI = 'https://localhost:44395/api/CourseInstructor';
const internalError = 'Hubo un error interno comuniquese con el administrador';
export const startGetInstructors = () => {
    return async ( dispatch ) => {
        dispatch( setStateData( true ) );
        try {
            const { status, data:body } = await getInstructors();
            if ( status === 200 ) {
                dispatch( getData( body ) );
                dispatch( setStateData( false ) );
            } else if ( status === 401 ) {
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

export const startGetInstructorCourses = ( InstructorID ) => {
    return async ( dispatch ) => {
        const propertyStateName = 'secondData';
        const loading = 'secondLoading';
        dispatch( setStateData( true, loading ) );
        try {
            const resp = await fetchConToken( `${ urlCI }/GetByInstructor?id=${ InstructorID }` );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            if ( status === 200 ) {
                const body = await resp.json();
                const newBody = body.map( d => instructorCoursesTransform( d ) );
                dispatch( getData( newBody, propertyStateName ) );
                dispatch( setStateData( false, loading ) );
            } else {
                dispatch( getData( [], propertyStateName ) );
                dispatch( setStateData( false, loading ) );
            }
        } catch ( error ) {
            dispatch( getData( [], propertyStateName ) );
            dispatch( setStateData( false, loading ) );
        }
    }
}

const instructorCoursesTransform = ( data ) => ({
    ...data,
    Course: data.Course.Title
});