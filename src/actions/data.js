import { types } from "../types/types";

export const getData = ( data, propertyStateName = 'data' ) => ({
    type: types.dataGet,
    payload: {
        data: data,
        property: propertyStateName
    }
});

export const setStateData = ( isLoading, propertyStateName = 'loading' ) => ({
    type: types.dataGetState,
    payload: {
        isLoading,
        property: propertyStateName
    }
});

export const setActiveData = ( data, propertyStateName = 'active' ) => ({
    type: types.dataSetActive,
    payload: {
        active: data,
        property: propertyStateName
    }
});

export const setResetActiveData = ( propertyStateName = 'active' ) => ({
    type: types.dataResetActive,
    payload: propertyStateName
});

export const createData = ( data, propertyStateName = 'data' ) => ({
    type: types.dataCreate,
    payload: {
        data,
        property: propertyStateName
    }
});

export const updateData = ( id, data, propertyStateName = 'data' ) => ({
    type: types.dataUpdate,
    payload: {
        data,
        id,
        property: propertyStateName
    }
});

export const deleteData = ( id, data, propertyStateName = 'data' ) => ({
    type: types.dataDelete,
    payload: {
        data,
        id,
        property: propertyStateName
    }
});

export const resetData = () => ({
    type: types.dataReset
})