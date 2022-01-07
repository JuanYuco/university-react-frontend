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
                [ action.payload.property ]: [ ...action.payload.data ]
            }
        case types.dataGetState:
            return {
                ...state,
                [ action.payload.property ]: action.payload.isLoading
            }
        case types.dataSetActive:
            return {
                ...state,
                [ action.payload.property ]: action.payload.active
            }
        case types.dataResetActive:
            return {
                ...state,
                [ action.payload ]: initialState[ action.payload ] || {}
            }
        case types.dataCreate:
            return {
                ...state,
                [ action.payload.property ]: [ ...state[ action.payload.property ], action.payload.data ]
            }
        case types.dataUpdate: 
            return {
                ...state,
                [ action.payload.property ]: [ ...state[ action.payload.property ].map( d => (
                        d[ action.payload.id ] === action.payload.data[ action.payload.id ] 
                        ? action.payload.data 
                        : d
                    )) 
                ]
            }
        case types.dataDelete:
            return {
                ...state,
                [ action.payload.property ]: [ ...state[ action.payload.property ].filter( d => d[ action.payload.id ] !== action.payload.data ) ]
            }
        case types.dataReset:
            return initialState
        default:
            return state;
    }
}