import React from 'react';

export const SelectOptions = React.memo(( { data = [], pref } ) => {
    return (
        <>
            {
                data.map( ( { val, name } ) => (
                    <option
                        key={ `op${ pref }${ val }` }
                        value={ val }
                    >
                        { name }
                    </option>
                ))
            }
        </>
    )
})
