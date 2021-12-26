import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

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