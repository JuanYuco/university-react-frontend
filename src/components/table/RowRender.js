import React from 'react';
import { useSelector } from 'react-redux';

export const RowRender = ( { row } ) => {
    const { properties, update, key, delete: deleteFunction } = useSelector( state => state.table );
    return (
        <tr>
            {
                properties.map( ( { name } ) => (
                    <td key={ `td${ row[key] }${ name }` }>{ row[ name ] }</td>
                ))
            }
            {
                ( update ) &&
                <td> 
                    <button className="btn btn-primary" onClick={ () => { update( row ) } }>
                        <i className="fas fa-edit"></i>
                    </button>
                </td>
            }
            {
                ( deleteFunction ) &&
                <td>
                    <button className="btn btn-danger" onClick={ () => { deleteFunction( row ) } }>
                        <i className="fas fa-trash"></i>
                    </button>
                </td>
            }
        </tr>
    )
}
