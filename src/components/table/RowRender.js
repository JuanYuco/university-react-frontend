import React from 'react';

export const RowRender = ( { row, properties = [], dif } ) => {
    return (
        <tr>
            {
                properties.map( ( { name } ) => (
                    <td key={ `td${ row[dif] }${ name }` }>{ row[ name ] }</td>
                ))
            }
            <td> 
                <button className="btn btn-primary">
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
