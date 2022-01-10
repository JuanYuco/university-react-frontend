import React, { useContext } from 'react';
import { RowRender } from './RowRender';
import { TableContext } from './tableContext';

export const TableTbody = () => {
    const { table : tableParameters } = useContext( TableContext );
    const { key, data, dif } = tableParameters;
    return (
        <tbody>
            {
                data.map( x => (
                    <RowRender key={ `rr${ dif }${ x[ key ] }` } row={ x } />
                ))
            }
        </tbody>
    )
}
