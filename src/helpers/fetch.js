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
                'x-token' : token
            }
        } );
    }

    return fetch( endpoint, {
        method,
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify( data )
    });
}