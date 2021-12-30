import { types } from "../types/types";

const initialState = {
    loading: false,
    data: [],
    active: {}
};

export const dataReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.dataGet:
            return {
                ...state,
                data: [ ...action.payload ]
            }
        case types.dataGetState:
            return {
                ...state,
                loading: action.payload
            }
        case types.dataSetActive:
            return {
                ...state,
                active: action.payload
            }
        case types.dataResetActive:
            return {
                ...state,
                active: initialState.active
            }
        case types.dataCreate:
            return {
                ...state,
                data: [ ...state.data, action.payload ]
            }
        case types.dataUpdate: 
            return {
                ...state,
                data: [ ...state.data.map( d => (
                        d[ action.payload.id ] === action.payload.data[ action.payload.id ] 
                        ? action.payload.data 
                        : d
                    )) 
                ]
            }
        case types.dataDelete:
            return {
                ...state,
                data: [ ...state.data.filter( d => d[ action.payload.id ] !== action.payload.data ) ]
            }
        case types.dataReset:
            return initialState
        default:
            return state;
    }
}