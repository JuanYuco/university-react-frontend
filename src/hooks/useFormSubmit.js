import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "./useForm";

export const useFormSubmit = ( ID, propertie, initialForm, createFuntion, updateFuntion ) => {
    const dispatch  = useDispatch();
    const active    = useSelector( state => state.data[propertie] );
    const newActive = ( active.hasOwnProperty( ID ) ) ? active : initialForm;
    const [ formValues, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if ( !formValues[ID] ) {
            dispatch( createFuntion( formValues ) );
            return;
        }

        dispatch( updateFuntion( formValues ) );
    }

    useEffect( () => {
        setFormValues( ( values ) => ({ ...values, ...newActive }) );
    }, [ newActive, setFormValues ]);

    return [
        formValues,
        handleInputChange,
        handleSubmit
    ];
}