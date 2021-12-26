import React from 'react';
import { useSelector } from 'react-redux';
import { Wait } from '../wait/Wait';
import { RowRender } from './RowRender';

export const TableRender = () => {
    const { properties, key, stateName, subState, create, update, delete:deleteFunction } = useSelector( state => state.table );
    const state = useSelector( state => ( subState ) ? state[ stateName ][ subState ] : state[stateName] );
    if ( !state || state.length === 0 ) return <Wait />;
    return (
        <>
            {
                ( create ) &&
                <button type="button" className="btn btn-dark" title="Create" onClick={ create }>
                    <i className="fas fa-plus"></i>
                </button>   
            }
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
                        {
                            ( update ) &&
                            <th></th>
                        }
                        {
                            ( deleteFunction ) &&
                            <th></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        state.map( x => (
                            <RowRender key={ x[ key ] } row={ x } properties={ properties } dif={ key } />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
