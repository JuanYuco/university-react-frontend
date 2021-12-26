import { types } from "../types/types";

const initialState = {
    loading: false,
    courses: [],
    active: {
        CourseID: '',
        Title: '',
        Credits: ''
    }
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
        case types.coursesSetActive:
            return {
                ...state,
                active: action.payload
            }
        case types.coursesResetActive: 
            return {
                ...state,
                active: initialState.active
            }
        default:
            return state;
    }
}