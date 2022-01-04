import React from 'react';
import { SelectOptions } from './SelectOptions';

export const Select = ( { data = [], pref, name, value, handleInputChange } ) => {
    return (
        <>
            <select
                className="form-control mb-1"
                name={ name }
                value={ value }
                onChange={ handleInputChange }
            >
                <option value="0">Seleccione una opción</option>
                <SelectOptions
                    data={ data }
                    pref={ pref }
                />
            </select>
        </>
    )
}
