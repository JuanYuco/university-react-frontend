import React, { useContext } from 'react';
import { TableContext } from './tableContext';

export const RowRender = ( { row } ) => {
    const { table : tableParameters } = useContext( TableContext );
    const { properties, update, key, delete: deleteFunction, dif } = tableParameters;
    
    return (
        <tr>
            {
                properties.map( ( { name } ) => (
                    <td key={ `td${ dif }${ row[key] }${ name }` }>{ row[ name ] }</td>
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
