import { types } from "../types/types";

export const getData = ( data ) => ({
    type: types.dataGet,
    payload: data
});

export const setStateData = ( isLoading ) => ({
    type: types.dataGetState,
    payload: isLoading
});

export const setActiveData = ( data ) => ({
    type: types.dataSetActive,
    payload: data
});

export const setResetActiveData = () => ({
    type: types.dataResetActive
});

export const createData = ( data ) => ({
    type: types.dataCreate,
    payload: data
});

export const updateData = ( id, data ) => ({
    type: types.dataUpdate,
    payload: {
        data,
        id
    }
});

export const deleteData = ( id, data ) => ({
    type: types.dataDelete,
    payload: {
        data,
        id
    }
});

export const resetData = () => ({
    type: types.dataReset
})