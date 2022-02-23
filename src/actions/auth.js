import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { resetData } from "./data";

export const startLogin = (email, password) => {
    return async ( dispatch ) => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false
        });

        const loginData = {
            email,
            password
        };

        let badRequest = 'Sorry :(, Internal error';
        try {
            const resp = await fetchSinToken( 'https://localhost:44395/api/Auth/Login', loginData, 'POST' );
            let mensaje = 'Wrong email or password';
            if ( resp.status === 200 ) {
                const body = await resp.json();
                localStorage.setItem('token', body.token );
                dispatch( login( body ) );
                Swal.close();
                return;
            } else if ( resp.status === 400 ) {
                await resp.json();
                Swal.close();
                return;
            } else if ( resp.status === 500 ) {
                mensaje = badRequest;
            }

            Swal.close();
            Swal.fire( 'Error', mensaje, 'error' );
        } catch ( error ) {
            Swal.close();
            Swal.fire('Error', badRequest, 'error');
        }
    }
}

export const startRegister = ( user ) => {
    return async () => {
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false
        });

        let badRequest = 'Sorry :(, Internal error';
        try {
            const resp = await fetchSinToken( 'https://localhost:44395/api/Auth/Register', user, 'POST' );
            let title = '';
            let mensaje = '';
            let type = '';
            if ( resp.status === 200 ) {
                title = 'Proceso exitoso';
                mensaje = 'El usuario se ha registrado correctamente';
                type = 'success';
            } else if ( resp.status === 400 ) {
                const body = await resp.json();
                title = 'Error';
                mensaje = `${ body.Message }`;
                type = 'error';
            } else if ( resp.status === 500 ) {
                title = 'Error';
                mensaje = badRequest;
                type = 'error';
            }

            Swal.close();
            Swal.fire( title, mensaje, type );
        } catch ( error ) {
            Swal.close();
            Swal.fire( 'Error', badRequest, 'error' );
        }
    }
}

export const startValidate = () => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchConToken( 'https://localhost:44395/api/Auth/Validate' );
            if ( resp.status === 200 ) {
                const body = await resp.json();
                dispatch( validate( body ) );
            } else if ( resp.status === 401 || resp.status === 500 ) {
                dispatch( startLogout() );
            }
        } catch ( error ) {
            dispatch( startLogout() );
        }
    }
}

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.removeItem('token');
        dispatch( resetData() );
        dispatch( logout() );
    }
}

const validate = (user) => ({
    type: types.authValidate,
    payload: {
        ...user
    }
});

const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: {
            ...user
        }
    }
}

const logout = () => ({
    type: types.authLogOut
});