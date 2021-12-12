import { types } from "../types/types";

const initialState = {
    id: null,
    name: null,
    lastName: null,
    email: null
}

export const authReducter = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload
            }
        case types.authLogOut:
            return {
                ...initialState
            }
        default:
            return state;
    }
}