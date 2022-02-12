import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setResetActiveData } from "../actions/data";
import { useForm } from "./useForm";

export const useFormSubmit = ( ID, propertie, initialForm, createFuntion, updateFuntion, extraInfo = {} ) => {
    const dispatch  = useDispatch();
    const active    = useSelector( state => state.data[propertie] );
    const newActive = ( (active) && active.hasOwnProperty( ID ) ) ? active : initialForm;
    const [ formValues, handleInputChange, setFormValues ] = useForm( newActive );

    const handleSubmit = ( e ) => {
        e.preventDefault();

        if ( !active || !active[ID] ) {
            dispatch( createFuntion( { ...formValues, ...extraInfo } ) );
        } else {
            dispatch( updateFuntion( { ...formValues, ...extraInfo } ) );
        }

        dispatch( setResetActiveData( propertie ) );
    }

    useEffect( () => {
        setFormValues( ( values ) => ({ ...values, ...newActive }) );
    }, [ newActive, setFormValues, active ]);

    return [
        formValues,
        handleInputChange,
        handleSubmit
    ];
}