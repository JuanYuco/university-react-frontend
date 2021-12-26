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
        case types.coursesCreate:
            return {
                ...state,
                courses: [ ...state.courses, action.payload ]
            }
        case types.coursesUpdate:
            return {
                ...state,
                courses: state.courses.map( course => ( 
                    ( course.CourseID === action.payload.CourseID )
                    ? action.payload
                    : course
                 ))
            }
        case types.courseDelete:
            return {
                ...state,
                courses: state.courses.filter( course => course.CourseID !== action.payload )
            }
        default:
            return state;
    }
}