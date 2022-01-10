import { types } from '../types/types';

export const tableReducer = ( state = {}, action ) => {
    switch ( action.type ) {
        case types.tableSetParameters:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}
