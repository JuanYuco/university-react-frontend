import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

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

        const resp = await fetchSinToken( 'https://localhost:44395/api/Auth/Login', loginData, 'POST' );
        if ( resp.status === 200 ) {
            const body = await resp.json();
            dispatch( login( body ) );
            Swal.close();
            return;
        } else if ( resp.status === 400 ) {
            const body = await resp.json();
            console.log( body );
            Swal.close();
            return;
        }

        Swal.close();
        Swal.fire( 'Error', 'Wrong email or password', 'error' );
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
        }

        Swal.close();
        Swal.fire( title, mensaje, type );
    }
}

const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: {
            ...user
        }
    }
}

export const logout = () => ({
    type: types.authLogOut
});