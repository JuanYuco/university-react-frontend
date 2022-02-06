import { fetchConToken } from "./fetch"

export const getStudents = async () => {
    try {
        const resp = await fetchConToken( 'https://localhost:44395/api/Student/GetAll' );
        const { status } = resp;
        if ( status === 200 ) {
            const body = await resp.json();
            return {
                status,
                data: body
            }
        }

        return {
            status,
            data: []
        }
    } catch ( error ) {
        return {
            status: 500,
            data: []
        }
    }
}