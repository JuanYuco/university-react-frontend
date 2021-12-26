import React from 'react';
import { useSelector } from 'react-redux';

export const RowRender = ( { row } ) => {
    const { properties, update, key } = useSelector( state => state.table );
    return (
        <tr>
            {
                properties.map( ( { name } ) => (
                    <td key={ `td${ row[key] }${ name }` }>{ row[ name ] }</td>
                ))
            }
            <td> 
                <button className="btn btn-primary" onClick={ () => { update( row ) } }>
                    <i className="fas fa-edit"></i>
                </button>
            </td>
            <td>
                <button className="btn btn-danger">
                    <i className="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    )
}
