import React, { useContext } from 'react';
import { TableContext } from './tableContext';

export const TableCreate = () => {
    const { table : tableParameters } = useContext( TableContext );
    const { create } = tableParameters;

    if ( !create ) return <></>;   
    return (
        <button type="button" className="btn btn-dark" title="Create" onClick={ create }>
            <i className="fas fa-plus"></i>
        </button>
    )
}
