import React, { useEffect, useReducer } from 'react';
import { startParameters } from '../../actions/table';
import { tableReducer } from '../../reducers/tableReducer';
import { Table } from './Table';
import { TableContext } from './tableContext';


const initialState = {
    properties: [],
    key: null,
    data: [],
    dif: '',
    loading: true,
    update: null,
    create: null,
    delete: null
};

export const TableStart = React.memo(({ parameters }) => {
    const [ table, dispatch ] = useReducer( tableReducer, initialState );

    useEffect( () => {
        dispatch( startParameters( parameters ) );
    }, [ parameters, dispatch ]);

    return (
        <TableContext.Provider value={ { table, dispatch } }>
            <Table />
        </TableContext.Provider>
    )
});
