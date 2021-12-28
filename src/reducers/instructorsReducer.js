import { types } from "../types/types";

const initialState = {
    loading: false,
    instructors: [],
    active: {
        ID: '',
        LastName: '',
        FirstMidName: '',
        HireDate: ''
    }
};

export const instructorsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.instructorsGet:
            return {
                ...state,
                instructors: [ ...action.payload ]
            }
        case types.instructorsGetState:
            return {
                ...state,
                loading: action.payload
            }
        case types.instructorsSetActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.instructorsResetActive:
            return {
                ...state,
                active: {
                    ...initialState.active
                }
            }
        default:
            return state;
    }
}