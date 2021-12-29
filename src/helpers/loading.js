import Swal from "sweetalert2"

export const loadingSwal = () => {
    Swal.fire({
        title: 'Loading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false
    });
}

export const closeSwal = () => {
    Swal.close();
}

export const mensajeSwal = ( title, mensaje, type ) => {
    Swal.fire( title, mensaje, type );
}