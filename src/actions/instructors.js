import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startGetInstructors = () => {
    return async ( dispatch ) => {
        dispatch( stateGet( true ) );
        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Instructor/GetAll' );
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