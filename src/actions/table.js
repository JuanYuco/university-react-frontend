import { types } from "../types/types";

export const startParameters = ( parameters ) => ({
    type: types.tableSetParameters,
    payload: parameters
});

export const startResetParametes = () => ({
    type: types.tableResetParameters
});