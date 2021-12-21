import React from 'react';
import { useSelector } from 'react-redux';
import { RowRender } from './RowRender';

export const TableRender = ( { properties = [], stateName, dif, subState = '' } ) => {
    const state = useSelector( state => ( subState ) ? state[ stateName ][ subState ] : state[stateName] );
    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        properties.map( ( { title } ) => (
                            <th key={ `th${ title }` }>
                                { title }
                            </th>
                        ))
                    }
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    state.map( x => (
                        <RowRender key={ x[ dif ] } row={ x } properties={ properties } dif={ dif } />
                    ))
                }
            </tbody>
        </table>
    )
}
