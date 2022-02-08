import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setActiveData, setResetActiveData } from "../actions/data";

export const useFormFunctions = ( startGetData, startDelete, propertieName = null ) => {
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( startGetData() );
    }, [ dispatch, startGetData ]);
    
    const setActiveUpdate = useCallback( ( data ) => {
        dispatch( setActiveData( data, propertieName ) );
    }, [ dispatch, propertieName ]);

    const setActiveCreate = useCallback( () => {
        dispatch( setResetActiveData( propertieName ) );
    }, [ dispatch, propertieName ]);

    const setDelete = useCallback( ( data ) => {
        Swal.fire({
            title: 'Eliminar registro',
            text: '¿Estas seguro que deseas eliminar el registro?',
            confirmButtonText: 'Eliminar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then( ( result ) => {
            if ( result.isConfirmed ) {
                dispatch( startDelete( data ) );
            }
        });
    }, [ dispatch, startDelete ]);

    return [
        setActiveCreate,
        setActiveUpdate,
        setDelete
    ];
}