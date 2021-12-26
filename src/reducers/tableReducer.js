import { types } from '../types/types';

const initialState = {
    properties: [],
    key: null,
    stateName: null,
    subState: null,
    update: null,
    create: null,
    delete: null
};

export const tableReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.tableSetParameters:
            return {
                ...action.payload
            }
        case types.tableResetParameters:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
