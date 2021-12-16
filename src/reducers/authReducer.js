import { types } from "../types/types";

const initialState = {
    id: null,
    name: null,
    lastName: null,
    email: null,
    validate: false
}

export const authReducter = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                validate: true
            }
        case types.authLogOut:
            return {
                ...initialState,
                validate: true
            }
        case types.authValidate:
            return {
                validate: true,
                ...action.payload
            }
        default:
            return state;
    }
}