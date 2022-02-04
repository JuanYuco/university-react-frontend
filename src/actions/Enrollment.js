import { fetchConToken } from "../helpers/fetch";
import { getData, setStateData } from "./data";

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

const enrollmentTransformation = ( enrollment ) => ({
    ...enrollment,
    Course: enrollment.Course.Title,
    Student: `${ enrollment.Student.FirstMidName } ${ enrollment.Student.LastName }`
})