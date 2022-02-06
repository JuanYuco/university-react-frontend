import { fetchConToken } from "../helpers/fetch";
import { closeSwal, loadingSwal, mensajeSwal } from "../helpers/loading";
import { createData, deleteData, getData, setStateData, updateData } from "./data";

const url = 'https://localhost:44395/api/Enrollment';
export const startGetEnrollment = () => {
    return async ( dispatch ) => {
        setStateData( true );
        try {
            const resp = await fetchConToken( `${ url }/GetAll` );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            if ( status === 200 ) {
                const body = await resp.json();
                const newBody = body.map( enrollment => enrollmentTransformation( enrollment ) );
                dispatch( getData( newBody ) );
                dispatch( setStateData( false ) );
                return;
            }

            dispatch( getData( [] ) );
            dispatch( setStateData( false ) );
        } catch ( error ) {
            dispatch( getData( [] ) );
            dispatch( setStateData( false ) );
        }
    }
}

export const startCreateEnrollment = ( enrollment ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Create`, enrollment, 'POST' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            if ( status === 200 ) {
                const newBody = enrollmentTransformation( body );
                dispatch( createData( newBody ) );
                closeSwal();
                mensajeSwal( 'Exitoso', 'Se relaciono correctamente', 'success' );
                return;
            }

            closeSwal();
            mensajeSwal( 'Error', body.Message, 'error' );
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'error', 'Contacte con el administrador', 'error' );
        }
    }
}

export const startUpdateEnrollment = ( enrollment ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Update`, enrollment, 'PUT' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            const body = await resp.json();
            if ( status === 200 ) {
                const newBody = enrollmentTransformation( body );
                dispatch( updateData( 'EnrollmentID', newBody ) );
                closeSwal();
                mensajeSwal( 'Exitoso', 'Se actualizó la relación correctamente', 'success' );
                return;
            }

            closeSwal();
            mensajeSwal( 'Error', body.Message, 'error' );
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'error', 'Contacte con el administrador', 'error' );
        }
    }
}

export const startDeleteEnrollment = ( EnrollmentID ) => {
    return async ( dispatch ) => {
        loadingSwal();
        try {
            const resp = await fetchConToken( `${ url }/Delete?id=${ EnrollmentID }`, null, 'DELETE' );
            const { status } = resp;
            if ( status === 401 ) {
                window.location.reload();
                return;
            }

            if ( status === 200 ) {
                dispatch( deleteData( 'EnrollmentID', EnrollmentID ) );
                closeSwal();
                mensajeSwal( 'Exitoso', 'Se actualizó la relación correctamente', 'success' );
                return;
            }

            const body = await resp.json();
            closeSwal();
            mensajeSwal( 'Error', body.Message, 'error' );
        } catch ( error ) {
            closeSwal();
            mensajeSwal( 'error', 'Contacte con el administrador', 'error' );
        }
    }
}

const enrollmentTransformation = ( enrollment ) => ({
    ...enrollment,
    Course: enrollment.Course.Title,
    Student: `${ enrollment.Student.FirstMidName } ${ enrollment.Student.LastName }`
})