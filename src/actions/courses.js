import { fetchConToken } from "../helpers/fetch";
import { createData, deleteData, getData, setStateData, updateData } from "./data";
import { closeSwal, loadingSwal, mensajeSwal } from "../helpers/loading";

const url = 'https://localhost:44395/api/CourseInstructor';
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

export const startGetCourseInstructor = ( CourseID ) => {
    return async ( dispatch ) => {
        const propertyStateName = 'secondData';
        const loading = 'secondLoading';
        dispatch( setStateData( true, loading ) );
        try {
            const resp = await fetchConToken( `${ url }/GetByCourse?id=${ CourseID }` );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            if ( status === 200 ) {
                const body = await resp.json();
                const newBody = body.map( courseIns => ( courseInstructorTransform( courseIns ) ));
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

export const startCreateCourseInstructor = ( courseInstructor ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            console.log(courseInstructor);
            const resp = await fetchConToken( `${ url }/Create`, courseInstructor, 'POST' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            if ( status === 200 ) {
                const newBody = courseInstructorTransform( body );
                dispatch( createData( newBody, 'secondData' ) );
                closeSwal();
                mensajeSwal( 'Proceso Exitoso', 'El curso se ha creado con exito', 'success' );
            } else if (  status === 400 || status === 500 ) {
                console.log(body);
                closeSwal();
                mensajeSwal('Error', body.Message, 'error');
            }
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'Error Interno', 'Comuniquese con el administrador', 'error' );
        }
    }
}

const courseInstructorTransform = ( data ) => ({
    ...data,
    Instructor: `${ data.Instructor.FirstMidName } ${ data.Instructor.LastName }`
});