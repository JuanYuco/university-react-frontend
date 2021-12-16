export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {
    if ( method === 'GET' ) {
        return fetch( endpoint );
    }

    return fetch( endpoint, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify( data )
    });
}


export const fetchConToken = ( endpoint, data, method = 'GET' ) => {
    const token = localStorage.getItem('token') || '';
    if ( method === 'GET' ) {
        return fetch( endpoint, {
            method,
            headers: {
                'Authorization' : token
            }
        } );
    }

    return fetch( endpoint, {
        method,
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify( data )
    });
}