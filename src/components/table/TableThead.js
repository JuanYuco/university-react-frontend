import React, { useContext } from 'react';
import { TableContext } from './tableContext';

export const TableThead = () => {
    const { table : tableParameters } = useContext( TableContext );
    const { properties, update, delete : deleteFunction, dif } = tableParameters;
    return (
        <thead>
            <tr>
                {
                    properties.map( ( { title } ) => (
                        <th key={ `th${ dif }${ title }` }>
                            { title }
                        </th>
                    ))
                }
                {
                    ( update ) && <th></th>
                }
                {
                    ( deleteFunction ) && <th></th>
                }
            </tr>
        </thead>
    )
}
