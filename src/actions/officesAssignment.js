import { fetchConToken } from "../helpers/fetch";
import { getData, setStateData } from "./data";

const url = 'https://localhost:44395/api/OfficeAssignment';

export const startGetOfficesAssignmnet = () => {
    return async ( dispatch ) => {
        dispatch( setStateData( true ) );
        try {
            const resp = await fetchConToken( `${ url }/GetAll` );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                const newData = body.map( ( { InstructorID, Location, Instructor } ) =>  ({
                    InstructorID,
                    Location,
                    InstructorName: `${ Instructor.FirstMidName } ${ Instructor.LastName }`
                }));

                dispatch( getData( newData ) );
                dispatch( setStateData( false ) );
            } else if ( resp.status === 401 ) {
                window.location.reload();
            } else {
                dispatch( getData( [] ) );
                dispatch( setStateData( false ) );
            }
        } catch ( error ) {
            dispatch( getData( [] ) );
            dispatch( setStateData( false ) );
        }
    }
}