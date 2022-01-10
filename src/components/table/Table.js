import React, { useContext } from 'react'
import { Wait } from '../wait/Wait';
import { TableContext } from './tableContext'
import { TableCreate } from './TableCreate';
import { TableTbody } from './TableTbody';
import { TableThead } from './TableThead';

export const Table = () => {
    const { table : tableParameters } = useContext( TableContext );
    const { loading } = tableParameters;

    if ( loading ) return <Wait />;
    return (
        <>
            <TableCreate />
            <table className="table">
                <TableThead />
                <TableTbody />
            </table>
        </>
    )
}
