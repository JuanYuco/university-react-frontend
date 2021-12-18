import { types } from "../types/types";

const initialState = {
    loading: false,
    courses: []
};

export const coursesReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.coursesGetState:
            return {
                ...state,
                loading: action.payload
            }
        case types.coursesGet:
            return {
                ...state,
                courses: [ ...action.payload ]
            }
        default:
            return state;
    }
}